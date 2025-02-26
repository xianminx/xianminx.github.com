---
layout: 'post'
title: 'Python3 install'
tags: [python]
date: '2018-01-18'
---

https://passingcuriosity.com/2015/installing-python-from-source/

```sh
[root@ZJHZ-PS-DNS4-Log01-SQ3#7FJ09 Python-3.6.4]# ./configure --enable-optimizations --prefix=/root/workspace/python3
make
make test
make install
```

[root@ZJHZ-PS-DNS4-Log01-SQ3#7FJ09 python3]# export PATH=$PATH:/root/workspace/python3/Python-3.6.4:/root/workspace/python3/bin
[root@ZJHZ-PS-DNS4-Log01-SQ3#7FJ09 python3]# pip3 install virtualenv
