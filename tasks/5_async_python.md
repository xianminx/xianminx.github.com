Async File I/O: Python vs Node — Cheat Sheet
Nov 20, 2026
Why Python has no async file API
No portable OS primitive exists for non-blocking disk I/O, so asyncio has nothing to build on; every "async file" library is a thread pool underneath.
• Readiness model fails for files: asyncio sits on selectors (epoll, kqueue, select). For a regular file these always report "ready", and read() still blocks on disk.
• Threads are the real answer: asyncio.to_thread / run_in_executor. aiofiles, anyio.Path and trio.open_file wrap exactly this.
• Usually cheap anyway: most reads hit the page cache and return in microseconds.
OS API
Problem
POSIX AIO (aio_read)
glibc implements it with userspace threads
Linux AIO (io_submit)
Needs O_DIRECT; can still block
io_uring (Linux 5.1+)
Good, but Linux-only and often disabled for security
Windows IOCP
Supports files, but completion model; not portable
Node.js: OS-async for network, threads for files
Node's async reputation comes from networking; its file APIs run on libuv's thread pool, just like Python's to_thread.
Operation
How it runs
TCP, UDP, pipes, TTYs, signals
Truly OS-async: epoll / kqueue / IOCP, no threads
fs.* (readFile, stat, readdir)
libuv thread pool, all platforms incl. Windows
dns.lookup()
Thread pool (blocking getaddrinfo)
dns.resolve*()
Truly async via c-ares
Async crypto, zlib
Thread pool
• Pool size: 4 threads by default; set UV_THREADPOOL_SIZE. Slow fs or dns.lookup calls can starve unrelated crypto work.
• io_uring: libuv added it for some Linux fs ops (~2023); Node later disabled it by default for security. Opt in with UV_USE_IO_URING=1 (verify against current release notes).
Is file I/O a web app bottleneck?
Rarely; the bigger risk is a blocking call stalling the event loop, not disk latency itself.
Usual bottlenecks, in order: 1) database (slow queries, N+1, pool exhaustion), 2) outbound network calls (APIs, auth, LLMs), 3) CPU on the event loop (big JSON, rendering, images), 4) file I/O.
When file I/O does bite:
• Serving static files or large downloads from the app → use a CDN, nginx or signed object-store URLs.
• Buffering large uploads to local disk → stream to object storage.
• Network filesystems (NFS, EFS, FUSE) → "file" reads are really network calls.
• Synchronous disk logging at high throughput → buffered handlers or stdout.
• Node thread pool saturation from many concurrent fs calls.
• SQLite and other embedded databases, where disk I/O is DB I/O.
The common pitfall: in FastAPI, a blocking read inside async def freezes every request, while a plain def endpoint runs in a thread pool. In Next.js, avoid per-request fs.readFileSync in route handlers or server components.
Quick reference
import asyncio

def read_file(path):
with open(path, "rb") as f:
return f.read()

async def main():
data = await asyncio.to_thread(read_file, "big.bin")
Need
Use
Async file read in Python
asyncio.to_thread, aiofiles, anyio.Path
File → socket transfer
loop.sendfile() (uses os.sendfile)
Spot event-loop blocking (Python)
PYTHONASYNCIODEBUG=1
Spot event-loop blocking (Node)
perf_hooks.monitorEventLoopDelay()
Find where request time goes
APM tracing: Datadog, Sentry, OpenTelemetry
Tune Node fs/crypto concurrency
UV_THREADPOOL_SIZE
