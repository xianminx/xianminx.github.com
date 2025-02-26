---
layout: "post"
title: 'Python logging'
published: "true"
tags: [python, logging]
date: "2017-10-10"
---

# Python logging module

![img](https://docs.python.org/2/_images/logging_flow.png)

- Loggers expose the interface that application code directly uses.

- Handlers send the log records (created by loggers) to the appropriate destination.

- Filters provide a finer grained facility for determining which log records to output.

- Formatters specify the layout of log records in the final output.

- `LogRecord`

## syslog

## Rsyslog

## Python Logging

```python
import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# create a file handler
handler = logging.FileHandler('hello.log')
handler.setLevel(logging.INFO)

# create a logging format
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)

# add the handlers to the logger
logger.addHandler(handler)

logger.info('Hello baby')
```

## Logger

logger names track the package/module hierarchy, and it’s intuitively obvious where events are logged just from the logger name.

- `Logger.setLevel()` specifies the lowest-severity log message a logger will handle, where debug is the lowest built-in severity level and critical is the highest built-in severity. For example, if the severity level is INFO, the logger will handle only INFO, WARNING, ERROR, and CRITICAL messages and will ignore DEBUG messages.

- `Logger.addHandler()` and `Logger.removeHandler()` add and remove handler objects from the logger object. Handlers are covered in more detail in Handlers.

- `Logger.addFilter()` and `Logger.removeFilter()` add and remove filter objects from the logger object. Filters are covered in more detail in Filter Objects.

### Config

logging.ini

three ways:

- Creating loggers, handlers, and formatters explicitly using Python code that calls the configuration methods listed above.

- Creating a logging config file and reading it using the fileConfig() function.
  ```python
  logging.config.fileConfig('logging.conf')
  ```

- Creating a dictionary of configuration information and passing it to the dictConfig() function.

Use rotating file handler

## Level/ Severity

debug(), info(), warning(), error() and critical().

## Handler

- `class Handler()`

- `class logging.StreamHandler(stream=None)`

- `class logging.NullHandler`

- `class logging.FileHandler(filename, mode='a', encoding=None, delay=False)`

- `class logging.handlers.WatchedFileHandler(filename[, mode[, encoding[, delay]]])`

- `class logging.handlers.RotatingFileHandler(filename, mode='a', maxBytes=0, backupCount=0, encoding=None, delay=0)`

  - `doRollover()`

- `class logging.handlers.TimedRotatingFileHandler(filename, when='h', interval=1, backupCount=0, encoding=None, delay=False, utc=False)`

- `class logging.handlers.SocketHandler(host, port)`

- `class logging.handlers.DatagramHandler(host, port)`

- `class logging.handlers.SysLogHandler(address=('localhost', SYSLOG_UDP_PORT), facility=LOG_USER, socktype=socket.SOCK_DGRAM)`

- `class logging.handlers.NTEventLogHandler(appname, dllname=None, logtype='Application')`

- `class logging.handlers.SMTPHandler(mailhost, fromaddr, toaddrs, subject, credentials=None, secure=None)`

- `class logging.handlers.BufferingHandler(capacity)`

- `class logging.handlers.MemoryHandler(capacity, flushLevel=ERROR, target=None)`

- `class logging.handlers.HTTPHandler(host, url, method='GET')`

## misc

- Logging variable data:

  ```python
  logging.warning('%s before you %s', 'Look', 'leap!')

  str.format()
  string.Template
  from string import Template
  s = Template('$who likes $what')
  s.substitute(who='tim', what='kung pao')
  ```

## TODO

1. what is python module and `__name__` variable?
   if the python interpreter is running that module (the source file) as the main program, it sets the special `__name__` variable to have a value "`__main__`". If this file is being imported from another module, `__name__` will be set to the module's name.
   A module’s `__name__` is set equal to '`__main__`' when read from standard input, a script, or from an interactive prompt.
   A module can discover whether or not it is running in the main scope by checking its own `__name__`, which allows a common idiom for conditionally executing code in a module when it is run as a script or with python -m but not when it is imported:

For a package, the same effect can be achieved by including a `__main__.py` module, the contents of which will be executed when the module is run with -m.