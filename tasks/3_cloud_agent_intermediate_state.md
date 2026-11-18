# Intermediate state for a Pydantic AI agent on Cloud Run

## Task

A Pydantic AI agent on Google Cloud has little shell access, and each instance's disk disappears between requests. Intermediate tool results still need to be available on the next turn.

Claude Code does this locally: it writes a long tool result to a temp file, then tells the model the summary and the path. If the model needs the full result, it reads that path.

Pydantic AI has no built-in equivalent. Design a store the model can open the same way, without a shell and without putting the full payload in the prompt.

## Answer

Keep Claude Code's split. The model sees a short summary plus a stable path, and the full payload lives outside the prompt. On Cloud Run that path is an artifact id in Cloud Storage. A local temp file will be gone on the next turn, and it is not shared across instances.

### What to store

One session, many artifacts.

| Piece                                     | Where                                                    | What the model sees      |
| ----------------------------------------- | -------------------------------------------------------- | ------------------------ |
| Full tool payload                         | `gs://<bucket>/sessions/<session_id>/<artifact_id>.json` | nothing                  |
| Index row (Firestore or one Postgres row) | `artifact_id`, tool name, summary, bytes, created_at     | a catalog line           |
| Message history                           | Postgres, already compacted                              | the summary object below |

The only path in the prompt is `artifact://<session_id>/<artifact_id>`. The model never sees the bucket or credentials.

### What a heavy tool returns

Under about 8 KB, return the result inline. Over that, write the full payload, then return only this object. This is what Pydantic AI records in history:

```json
{
  "path": "artifact://sess_abc/art_01H...",
  "summary": "42 rows, columns id, name, status. 3 failed.",
  "preview": "<first ~1 KB>",
  "bytes": 180000
}
```

### How the model reads it back

Two tools, both closed over the store in deps:

- `read_artifact(path, offset=0, limit=8000)` loads that slice from Cloud Storage.
- `list_artifacts()` returns the index for this session.

```python
@dataclass
class Deps:
    session_id: str
    store: ArtifactStore  # GCS client + index

@agent.tool
async def read_artifact(
    ctx: RunContext[Deps], path: str, offset: int = 0, limit: int = 8000
) -> str:
    return await ctx.deps.store.read(ctx.deps.session_id, path, offset, limit)
```

Wrap each heavy tool so the spill happens before Pydantic AI records the return value. The tool writes the summary itself from the payload: row count, column names, and the first kilobyte. A `history_processors` hook can rewrite older tool parts that were saved in full, so a turn that forgot to spill still shrinks before the next request.

```python
async def spill(ctx: RunContext[Deps], tool: str, payload: str) -> str | dict:
    if len(payload.encode()) <= 8_000:
        return payload
    ref = await ctx.deps.store.put(
        ctx.deps.session_id, tool=tool, body=payload, summary=summarize(payload)
    )
    return {
        "path": ref.path,
        "summary": ref.summary,
        "preview": payload[:1000],
        "bytes": len(payload.encode()),
    }
```

If the Cloud Storage write fails, return that error plus the preview. Leave the full payload out of the message history either way.

### Who may read a path

`read_artifact` parses `artifact://<session_id>/<artifact_id>` and accepts the call when `<session_id>` equals `ctx.deps.session_id`. The store then loads `gs://<bucket>/sessions/<session_id>/<artifact_id>.json` and returns `body[offset:offset+limit]`. A path from another session is an error. The model holds the pointer. The bucket name and the credentials stay inside the store client.

### Next round

At the end of a run, serialize `result.all_messages()` and save that JSON next to the session row. The tool parts in it are already the small summary objects.

On the next request, any instance loads that history and passes the same `session_id` in deps. An instructions function reads the index and adds a short catalog to that run:

```text
Artifacts for sess_abc:
- artifact://sess_abc/art_01H  search_rows  42 rows, 3 failed, 180 KB
```

History can be trimmed later and the catalog still names every blob the model can open. The id in history is the pointer. Cloud Storage is the file.
