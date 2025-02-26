---
layout: post
title: 'Python multitasking'
published: true
tags: [python]
---

- [threading](#threading)
  - [Thread](#thread)
  - [Queue](#queue)
  - [Actor](#actor)
- [multiprocessing](#multiprocessing)
  - [Pool](#pool)
- [concurrent.futures](#concurrentfutures)
  - [Executor](#executor)
  - [Difference](#difference)
  - [ThreadPoolExecutor](#threadpoolexecutor)
  - [ProcessPoolExecutor](#processpoolexecutor)
  - [Future](#future)
  - [module functions](#module-functions)
- [Debugging Python Multi-processes Program](#debugging-python-multi-processes-program)
- [Take aways](#take-aways)
- [References](#references)

## threading

### Thread

- Methods:
  - `start()`
  - `run()`
  - `is_alive()`
  - `join()`

Threads are executed in their own system-level thread (e.g., a POSIX thread or Windows threads) that is fully managed by the host operating system. Once started, threads run independently until the target function returns.

```python
from threading import Thread
t = Thread(target=countdown, args=(10,))
t.start()
```

Due to a global interpreter lock (GIL), Python threads are restricted to an execution model that only allows one thread to execute in the interpreter at any given time. For this reason, Python threads should generally not be used for computationally intensive tasks where you are trying to achieve parallelism on multiple CPUs. They are much better suited for I/O handling and handling concurrent execution in code that performs blocking operations (e.g., waiting for I/O, waiting for results from a database, etc.).

- `Event`

  - `wait()`
  - `set()`

- `Condition`
  - `wait()`
  - `notify_all()`
- `Semaphore`

```python
sema = threading.Semaphore(0)
sema.release()
```

- `Lock`

```python
self._value_lock = threading.Lock()
with self._value_lock:
        self._value += delta
```

- `RLock`

An RLock or re-entrant lock object is a lock that can be acquired multiple times by the same thread. It is primarily used to implement code based locking or synchronization based on a construct known as a "monitor." With this kind of locking, only one thread is allowed to use an entire function or the methods of a class while the lock is held.

- `threading.local()`

### Queue

Perhaps the safest way to send data from one thread to another is to use a Queue from the queue library. To do this, you create a Queue instance that is shared by the threads. Threads then use put() or get() operations to add or remove items from the queue.

- `q.put(data)`
- `data = in_q.get()`
- `in_q.task_done()`
- `q.qsize()`
- `q.full()`
- `q.empty()`

### Actor

https://www.oreilly.com/learning/python-cookbook-concurrency#actors

> In a nutshell, an actor is a concurrently executing task that simply acts upon messages sent to it. In response to these messages, it may decide to send further messages to other actors. Communication with actors is one way and asynchronous. Thus, the sender of a message does not know when a message actually gets delivered, nor does it receive a response or acknowledgment that the message has been processed.

## multiprocessing

[multiprocessing](https://docs.python.org/2/library/multiprocessing.html)

- `Process`
- Exchanging objects between processes
-

### Pool

```python
class Pool(object):
    Process = Process

    def __init__(self, processes=None, initializer=None, initargs=(),
                 maxtasksperchild=None):
        self._setup_queues()
        self._taskqueue = Queue.Queue()
        self._cache = {}
        ... # stuff we don't care about
        self._worker_handler = threading.Thread(
            target=Pool._handle_workers,
            args=(self, )
            )
        self._worker_handler.daemon = True
        self._worker_handler._state = RUN
        self._worker_handler.start()

        self._task_handler = threading.Thread(
            target=Pool._handle_tasks,
            args=(self._taskqueue, self._quick_put, self._outqueue,
                  self._pool, self._cache)
            )
        self._task_handler.daemon = True
        self._task_handler._state = RUN
        self._task_handler.start()

        self._result_handler = threading.Thread(
            target=Pool._handle_results,
            args=(self._outqueue, self._quick_get, self._cache)
            )
        self._result_handler.daemon = True
        self._result_handler._state = RUN
        self._result_handler.start()
```

- queues:
  - `self._taskqueue = Queue.Queue()`: cache all submited tasks
  - `self._inqueue = SimpleQueue()`: `_task_handler` fetch task from \_taskqueue and add to \_inqueue for process to work on, this is shared among main process and worker process.
  - `self._outqueue = SimpleQueue()`: store the result.
- threads:
  - `_worker_handler = _handle_workers(pool)`: maintain the internal state
  - `_task_handler   = _handle_tasks(taskqueue, put, outqueue, pool, cache)`: fetch tasks and send to worker process
  - `_result_handler = _handle_results(outqueue, get, cache)`: process result, callback etc.

Note: callback is called in `_result_handler` thread in caller process.

## [concurrent.futures](https://pythonhosted.org/futures)

### Executor

- `Executor.submit(fn, *args, **kwargs)`
- `Executor.map(func, *iterables, timeout=None)`
- `Executor.shutdown(wait=True)`

### Difference

- Use the `ProcessPoolExecutor` for CPU intensive tasks.
- The `ThreadPoolExecutor` is better suited for network operations or I/O.

### ThreadPoolExecutor

`executor = ThreadPoolExecutor(max_workers=2)`

### ProcessPoolExecutor

`executor = concurrent.futures.ProcessPoolExecutor(max_workers=None)`

```python
"""Implements ProcessPoolExecutor.

The follow diagram and text describe the data-flow through the system:

|======================= In-process =====================|== Out-of-process ==|

+----------+     +----------+       +--------+     +-----------+    +---------+
|          |  => | Work Ids |    => |        |  => | Call Q    | => |         |
|          |     +----------+       |        |     +-----------+    |         |
|          |     | ...      |       |        |     | ...       |    |         |
|          |     | 6        |       |        |     | 5, call() |    |         |
|          |     | 7        |       |        |     | ...       |    |         |
| Process  |     | ...      |       | Local  |     +-----------+    | Process |
|  Pool    |     +----------+       | Worker |                      |  #1..n  |
| Executor |                        | Thread |                      |         |
|          |     +----------- +     |        |     +-----------+    |         |
|          | <=> | Work Items | <=> |        | <=  | Result Q  | <= |         |
|          |     +------------+     |        |     +-----------+    |         |
|          |     | 6: call()  |     |        |     | ...       |    |         |
|          |     |    future  |     |        |     | 4, result |    |         |
|          |     | ...        |     |        |     | 3, except |    |         |
+----------+     +------------+     +--------+     +-----------+    +---------+

Executor.submit() called:
- creates a uniquely numbered _WorkItem and adds it to the "Work Items" dict
- adds the id of the _WorkItem to the "Work Ids" queue

Local worker thread:
- reads work ids from the "Work Ids" queue and looks up the corresponding
  WorkItem from the "Work Items" dict: if the work item has been cancelled then
  it is simply removed from the dict, otherwise it is repackaged as a
  _CallItem and put in the "Call Q". New _CallItems are put in the "Call Q"
  until "Call Q" is full. NOTE: the size of the "Call Q" is kept small because
  calls placed in the "Call Q" can no longer be cancelled with Future.cancel().
- reads _ResultItems from "Result Q", updates the future stored in the
  "Work Items" dict and deletes the dict entry

Process #1..n:
- reads _CallItems from "Call Q", executes the calls, and puts the resulting
  _ResultItems in "Request Q"
"""
```

### Future

- `Future.cancel()`
- `Future.cancelled()`
- `Future.running()`
- `Future.result(timeout=None)`
- `Future.exception(timeout=None)`
- `Future.add_done_callback(fn)`

Internal methods, meant for use in unit tests and Executor implementations.

- `Future.set_running_or_notify_cancel()`
- `Future.set_result(result)`
- `Future.set_exception(exception)`

### module functions

- `concurrent.futures.wait(fs, timeout=None, return_when=ALL_COMPLETED)`
- `concurrent.futures.as_completed(fs, timeout=None)`

The main difference between the aforementioned `map` method with `as_completed` is that `map` returns the results in the order in which we pass the iterables. That is the first result from the map method is the result for the first item. On the other hand, the first result from the `as_completed` function is from whichever future completed first.

#Launching a Daemon Process on Unix

## Debugging Python Multi-processes Program

## Take aways

- Another subtle aspect of pools is that mixing threads and process pools together can be a good way to make your head explode. If you are going to use both of these features together, it is often best to create the process pool as a singleton at program startup, prior to the creation of any threads. Threads will then use the same process pool for all of their computationally intensive work.

- Many programmers, when faced with thread performance problems, are quick to blame the GIL for all of their ills. However, doing so is shortsighted and naive. Just as a real-world example, mysterious "stalls" in a multithreaded network program might be caused by something entirely different (e.g., a stalled DNS lookup) rather than anything related to the GIL. The bottom line is that you really need to study your code to know if the GIL is an issue or not. Again, realize that the GIL is mostly concerned with CPU-bound processing, not I/O.

- Great care should be made when combining process pools and programs that use threads. In particular, you should probably create and launch process pools prior to the creation of any threads (e.g., create the pool in the main thread at program startup).

## References

- [Python Cookbook: Concurrency](https://www.oreilly.com/learning/python-cookbook-concurrency)
- [concurrent.futures](https://pythonhosted.org/futures)
- [Python Concurrency Cheatsheet](https://www.pythonsheets.com/notes/python-concurrency.html)
