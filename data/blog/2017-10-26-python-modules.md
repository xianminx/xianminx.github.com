---
layout: post
title: 'Python Modules, Classes, Packages'
published: true
tags: [python]
---

# Python Modules, Classes, Packages

## Module

- A module is a file containing Python definitions and statements. The file name is the module name with the suffix ‘.py’ appended. Within a module, the module's name (as a string) is available as the value of the global variable `__name__`.

```python
__name__
import fibo
from fibo import fib, fib2
from fibo import *
```

- symbol table

- A module can contain executable statements as well as function definitions. These statements are intended to initialize the module. They are executed only the first time the module is imported somewhere.

- When a module named ‘spam’ is imported, the interpreter searches for a file named ‘spam.py’ in the current directory, and then in the list of directories specified by the environment variable ‘PYTHONPATH’. This has the same syntax as the shell variable ‘PATH’, that is, a list of directory names. When ‘PYTHONPATH’ is not set, or when the file is not found there, the search continues in an installation-dependent default path; on UNIX, this is usually ‘.:/usr/local/lib/python’.
- `sys.path` = the directory containing the input script (or the current directory), + ‘PYTHONPATH’ + the installation-dependent default.

- `dir()` find out which names a module defines.
- standard module `__builtins__`

```python
# -*- coding: utf8 -*-
import os, sys

# demo module usage

def f():
    print "function f in module 'module.py'"
print "__name__ = ", __name__
print "os.environ['PYTHONPATH'] = ", os.environ.get("PYTHONPATH", '')
print "sys.path = ", sys.path
print "dir() = ", dir()
print "__builtins__ = ", __builtins__
print "dir(__builtins__) = ", dir(__builtins__)
```

outputs：

```sh
➜  python101 python /Users/lucas/dev/workspace/python/python101/module.py
__name__ =  __main__
os.environ['PYTHONPATH'] =
sys.path =  ['/Users/lucas/dev/workspace/python/python101', '/usr/local/Cellar/python/2.7.13/Frameworks/Python.framework/Versions/2.7/lib/python27.zip', '/usr/local/Cellar/python/2.7.13/Frameworks/Python.framework/Versions/2.7/lib/python2.7', '/usr/local/Cellar/python/2.7.13/Frameworks/Python.framework/Versions/2.7/lib/python2.7/plat-darwin', '/usr/local/Cellar/python/2.7.13/Frameworks/Python.framework/Versions/2.7/lib/python2.7/plat-mac', '/usr/local/Cellar/python/2.7.13/Frameworks/Python.framework/Versions/2.7/lib/python2.7/plat-mac/lib-scriptpackages', '/usr/local/Cellar/python/2.7.13/Frameworks/Python.framework/Versions/2.7/lib/python2.7/lib-tk', '/usr/local/Cellar/python/2.7.13/Frameworks/Python.framework/Versions/2.7/lib/python2.7/lib-old', '/usr/local/Cellar/python/2.7.13/Frameworks/Python.framework/Versions/2.7/lib/python2.7/lib-dynload', '/usr/local/lib/python2.7/site-packages', '/usr/local/Cellar/protobuf/2.6.1/libexec/lib/python2.7/site-packages']
dir() =  ['__builtins__', '__doc__', '__file__', '__name__', '__package__', 'f', 'os', 'sys']
__builtins__ =  <module '__builtin__' (built-in)>
dir(__builtins__) =  ['ArithmeticError', 'AssertionError', 'AttributeError', 'BaseException', 'BufferError', 'BytesWarning', 'DeprecationWarning', 'EOFError', 'Ellipsis', 'EnvironmentError', 'Exception', 'False', 'FloatingPointError', 'FutureWarning', 'GeneratorExit', 'IOError', 'ImportError', 'ImportWarning', 'IndentationError', 'IndexError', 'KeyError', 'KeyboardInterrupt', 'LookupError', 'MemoryError', 'NameError', 'None', 'NotImplemented', 'NotImplementedError', 'OSError', 'OverflowError', 'PendingDeprecationWarning', 'ReferenceError', 'RuntimeError', 'RuntimeWarning', 'StandardError', 'StopIteration', 'SyntaxError', 'SyntaxWarning', 'SystemError', 'SystemExit', 'TabError', 'True', 'TypeError', 'UnboundLocalError', 'UnicodeDecodeError', 'UnicodeEncodeError', 'UnicodeError', 'UnicodeTranslateError', 'UnicodeWarning', 'UserWarning', 'ValueError', 'Warning', 'ZeroDivisionError', '__debug__', '__doc__', '__import__', '__name__', '__package__', 'abs', 'all', 'any', 'apply', 'basestring', 'bin', 'bool', 'buffer', 'bytearray', 'bytes', 'callable', 'chr', 'classmethod', 'cmp', 'coerce', 'compile', 'complex', 'copyright', 'credits', 'delattr', 'dict', 'dir', 'divmod', 'enumerate', 'eval', 'execfile', 'exit', 'file', 'filter', 'float', 'format', 'frozenset', 'getattr', 'globals', 'hasattr', 'hash', 'help', 'hex', 'id', 'input', 'int', 'intern', 'isinstance', 'issubclass', 'iter', 'len', 'license', 'list', 'locals', 'long', 'map', 'max', 'memoryview', 'min', 'next', 'object', 'oct', 'open', 'ord', 'pow', 'print', 'property', 'quit', 'range', 'raw_input', 'reduce', 'reload', 'repr', 'reversed', 'round', 'set', 'setattr', 'slice', 'sorted', 'staticmethod', 'str', 'sum', 'super', 'tuple', 'type', 'unichr', 'unicode', 'vars', 'xrange', 'zip']
```

## package

- Packages are a way of structuring Python's module namespace by using "dotted module names".
- The `__init__.py` files are required to make Python treat the directories as containing packages;
- `    __all__ = ["echo", "surround", "reverse"]`
- Intra-package References
- `__path__`. This is initialized to be a list containing the name of the directory holding the package's `__init__.py` before the code in that file is executed.

## Class

```python
# -*- coding: utf8 -*-

class Foo:
    val=0
    def __init__(self, val):
        self.val = val
        pass

    def printVal(self):
        print(self.val)


foo = Foo(5)
foo.printVal()
```

- `__init__`

```python
    def __init__(self, val): # constructor
        self.val = val
```

- `self` `this` `me`, etc.
- methods
- variables: Python creates variables on the fly, when they are first assigned, and class member variables are no different.
  ```python
      self.val = val
  ```
- instance
  we can change the definition of a class on the fly, or even create a completely new class at run-time!

  ```python
  Foo.printVal = printVal
  obj.printVal()
  del Foo.printVal

  MyNewClass = type('MyNewClass', (object,), dict())
  ```

- standard methods:

  - `__del__`: Called when an instance is about to be destroyed, which lets you do any clean-up e.g. closing file handles or database connections
  - `__repr__` and `__str__`: Both return a string representation of the object, but `__repr__` should return a Python expression that can be used to re-create the object. The more commonly used one is `__str__`, which can return anything.
  - `__cmp__`: Called to compare the object with another object. Note that this is only used with Python 2.x. In Python 3.x, only rich comparison methods are used. Such as `__lt__`.
  - `__lt__`, `__le__`, `__eq__`, `__ne__`, `__gt__` and `__ge__`: Called to compare the object with another object. These will be called if defined, otherwise Python will fall-back to using `__cmp__`.
  - `__hash__`: Called to calculate a hash for the object, which is used for placing objects in data structures such as sets and dictionaries.
  - `__call__`: Lets an object be "called" e.g. so that you can write things like this: obj(arg1,arg2,...).
  - Python also lets you define methods that let an object act like an array (so you can write things like this: `obj[2] = "foo"`), or like a numeric type (so you write things like this: `print(obj1 + 3*obj2)`.
  - `__dict__` − Dictionary containing the class's namespace.
  - `__doc__` − Class documentation string or none, if undefined.
  - `__name__` − Class name.
  - `__module__` − Module name in which the class is defined. This attribute is "`__main__`" in interactive mode.
  - `__bases__` − A possibly empty tuple containing the base classes, in the order of their occurrence in the base class list.

- In Python, methods and member variables are always public i.e. anyone can access them.
- private methods and variables:
  Class methods and variable names that start with two underscores are considered to be private to that class, However, this is only a convention

- Class Inheritance

  ```python
  class Foo:
      def __init__(self, val):
          self.val = val
      def printVal(self):
          print(self.val)

  class DerivedFoo(Foo):
      def negateVal(self):
          self.val = -self.val
  ```

- `isinstance`
- `issubclass`
- Class Iterators and Generators

  ```python

  class Backwards:
      def __init__(self, val):
          self.val = val
          self.pos = len(val)

      def __iter__(self):
          return self

      def next(self):
          # We're done
          if self.pos <= 0:
              raise StopIteration

          self.pos = self.pos - 1
          return self.val[self.pos]

  for x in Backwards([1,2,3]):
      print(x)
  ```

- generator
  `yield`

- class variable
- instance variable
- function overloading
- inheritance

- data memebers
- documentation

  ```python
  class Employee:
      'Common base class for all employees'
      empCount = 0

      def __init__(self, name, salary):
          self.name = name
          self.salary = salary
          Employee.empCount += 1

      def displayCount(self):
          print "Total Employee %d" % Employee.empCount

      def displayEmployee(self):
          print "Name : ", self.name,  ", Salary: ", self.salary
          class_suite
  ```

  The class has a documentation string, which can be accessed via ClassName.**doc**.

- The `getattr(obj, name[, default])` − to access the attribute of object.

- The `hasattr(obj,name)` − to check if an attribute exists or not.

- The `setattr(obj,name,value)` − to set an attribute. If attribute does not exist, then it would be created.

- The `delattr(obj, name)` − to delete an attribute.

- Destroying Objects (Garbage Collection)
  ```python
     def __del__(self):
  ```

## import

how to import module in parent directory?

check [How does python find packages?](https://leemendelowitz.github.io/blog/how-does-python-find-packages.html)

Python imports work by searching the directories listed in sys.path.

```python
> import sys
> print '\n'.join(sys.path)

/usr/lib/python2.7
/usr/lib/python2.7/plat-x86_64-linux-gnu
/usr/lib/python2.7/lib-tk
/usr/lib/python2.7/lib-old
/usr/lib/python2.7/lib-dynload
/usr/local/lib/python2.7/dist-packages
/usr/lib/python2.7/dist-packages
```

sys.path is populated using the current working directory, followed by directories listed in your PYTHONPATH environment variable, followed by installation-dependent default paths, which are controlled by the site module.

The site module is automatically imported when you start Python, you can read more about how it manipulates your sys.path in the Python docs.

Find module

```python
> import imp
> imp.find_module('numpy')
(None, '/usr/local/lib/python2.7/dist-packages/numpy', ('', '', 5))
```

### site-python
