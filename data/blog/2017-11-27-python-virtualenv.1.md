---
layout: 'post'
title: 'Python VIRTUAL ENV'
tags: [python]
date: '2017-11-27'
---

Python virtual enviroment 提供一个独立的 python 运行环境， 用来解决类似 Windows 上的 DLL HELL 问题。
将应用的依赖和版本等隔离开来。每个应用有自己的隔离环境。

Python 在用的版本有很多， 2.6， 2.7， 3.5， 3.6 等等。 每一个依赖也可能很多版本，中间很多兼容性问题。 如果将他们全都放到一起， 就会产生 DLL HELL 的问题。

```sh
➜  module2 l /usr/local/lib/python2.7/site-packages
total 4392
drwxr-xr-x  95 lucas  admin   3.0K Nov 24 18:00 .
drwxr-xr-x   4 lucas  admin   128B Nov  1 20:26 ..
drwxr-xr-x   9 lucas  admin   288B Nov  3 23:25 astroid-1.5.3.dist-info
drwxr-xr-x   7 lucas  admin   224B Nov  3 23:25 backports
drwxr-xr-x   9 lucas  admin   288B Nov  3 23:25 backports.functools_lru_cache-1.4.dist-info
```

## Install

```sh
$ [sudo] pip install virtualenv
```

也可以安装源代码到本地，这样不需要 sudo 权限

```sh
$ python virtualenv.py myVE
$ ls -lah
total 256K
drwxr-xr-x 10 lucas lucas 4.0K 2017-11-27 16:01 .
drwxr-xr-x  7 lucas lucas 4.0K 2017-11-27 16:01 ..
-rw-r--r--  1 lucas lucas 1.2K 2016-11-16 11:39 AUTHORS.txt
drwxr-xr-x  2 lucas lucas 4.0K 2016-11-16 11:39 bin
drwxr-xr-x  2 lucas lucas 4.0K 2016-11-16 11:39 docs
-rw-r--r--  1 lucas lucas 1.2K 2016-11-16 11:39 LICENSE.txt
-rw-r--r--  1 lucas lucas  345 2016-11-16 11:39 MANIFEST.in
drwxr-xr-x  5 lucas lucas 4.0K 2017-11-27 16:01 myVE
-rw-r--r--  1 lucas lucas 3.4K 2016-11-16 11:39 PKG-INFO
-rw-r--r--  1 lucas lucas 1.2K 2016-11-16 11:39 README.rst
drwxr-xr-x  2 lucas lucas 4.0K 2016-11-16 11:39 scripts
-rw-r--r--  1 lucas lucas   88 2016-11-16 11:39 setup.cfg
-rw-r--r--  1 lucas lucas 4.0K 2016-11-16 11:39 setup.py
drwxr-xr-x  2 lucas lucas 4.0K 2016-11-16 11:39 tests
drwxr-xr-x  2 lucas lucas 4.0K 2016-11-16 11:39 virtualenv.egg-info
drwxr-xr-x  2 lucas lucas 4.0K 2016-11-16 11:39 virtualenv_embedded
-rwxr-xr-x  1 lucas lucas  97K 2016-11-16 11:39 virtualenv.py
-rw-r--r--  1 lucas lucas  86K 2017-11-27 16:01 virtualenv.pyc
drwxr-xr-x  2 lucas lucas 4.0K 2016-11-16 11:39 virtualenv_support
```

核心文件是 `virtualenv.py`
当然要求 相关的类库存在。

## 使用

```sh
➜  /tmp virtualenv ENV
New python executable in /private/tmp/ENV/bin/python2.7
Also creating executable in /private/tmp/ENV/bin/python
Installing setuptools, pip, wheel...done.

➜  /tmp tree -L 2 ENV
ENV
├── bin
│   ├── activate
│   ├── activate.csh
│   ├── activate.fish
│   ├── activate_this.py
│   ├── easy_install
│   ├── easy_install-2.7
│   ├── pip
│   ├── pip2
│   ├── pip2.7
│   ├── python -> python2.7
│   ├── python-config
│   ├── python2 -> python2.7
│   ├── python2.7
│   └── wheel
├── include
│   └── python2.7 -> /usr/local/Cellar/python/2.7.13/Frameworks/Python.framework/Versions/2.7/include/python2.7
├── lib
│   └── python2.7
└── pip-selfcheck.json

5 directories, 15 files
```

- ENV/lib/ and ENV/include/ are created, containing supporting library files for a new virtualenv python. Packages installed in this environment will live under ENV/lib/pythonX.X/site-packages/.

- ENV/bin is created, where executables live - noticeably a new python. Thus running a script with #! /path/to/ENV/bin/python would run that script under this virtualenv’s python.

- The crucial packages pip and setuptools are installed, which allow other packages to be easily installed to the environment. This associated pip can be run from ENV/bin/pip.

### 激活

```sh
$ source bin/activate
```

```sh
$ echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games

$ source bin/activate

$ echo $PATH
/home/xx/virtualenv-15.1.0/myVE/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games
```
