---
layout: post
title: "Python Optimize"
published: true
tags: [python]
---

## 项目优化

最近使用 Python做了一个日志转换的小项目。原生 Python，没有使用任何的Framework. 写了约两周。 越写越顺手。 发现 Python 的整个设计比较人性化，没有太多的冷知识和需要记忆的。 

项目逻辑比较简单。 一句话解释就是对日志格式进行转换。 

```
原始日志(gzip/8.5M/300K lines)， 22个/min
                ↓
每行日志进行目标格式的转换，生成新的日志 （需要生成2种格式的日志，即两份）
                ↓
每5分钟或者700M(压缩前大小， 压缩后大概100M) 滚动
                ↓
新的日志 (gzip/100M/5M lines), 
```


对于单个原始文件， 最终优化到10s/个的处理速度。

最开始是需要12分钟的速度， 经过多次优化，达到现在的速度。 


## 优化1: Python 字符串处理
字符串处理。 Python 本身的字符串处理速度是比较慢的。 
每行进行格式转换的算法。 

### v1: string.split()
最开始是使用字符串空格切分，得到每个字段。由于每一行的字段数目不是完全一致，切分是分多次进行。
非常慢。 

### v2: regex
花了一个晚上的时间， 使用 regex 一次性获取所有字段，regex 只需要编译一次。 速度提升非常快。 


## 优化2: bitarray
生成新格式其中一个需求是针对的某些符合需求的日志做替换。 
如果日志中的 IP 不在给定的 IP 网段集合中， 则需要使用备用库中的 IP 替换原始 IP。 
这涉及到一个判定 IP 在不在给定 IP 网段集合的算法。 
IP 网段的形式是 (1.1.1.0/24).约有3000个网段。

### v1: 直接循环判定

使用 python ipaddress library:

```python

    for line in lines:
        subnet = ipaddress.ip_network(line)
        self.localnet.append(subnet)

    def ip_in_localnet_raw(self, ip):
        ''' deprecated raw method, which is slow. use  ip_in_localnet
        '''
        address = ipaddress.ip_address(unicode(ip))
        for subnet in self.localnet:
            if address in subnet:
                return True
        return False
    
```

这个算法当中， 每次 IP 都需要循环3000/2次判定在不在给定 IP 网段集合中。时间非常慢。 

### v2: bloomfilter
对于快速判定某元素在不在指定集合中， bloomfilter 是非常好的结构。 
直接使用 bloomfilter， 将 IP 网段集合转换成 IP 集合。 
但是3000个网段，对应的 IP 数量非常庞大，bloom filter 也非常大。


### v3: bitarray
IP 数据有很好的特征。 IPV4 实际是32bit unsigned integer. 如果直接将一个 IP 在不在用一个 bit 表示，则需要2^32bit =512MB 的内存。 对于服务器来说， 可以接受。 当然可以直接使用一个 int array 。 但 Python 有现成的 library 来使用: bitarray

```python
        self.ips = bitarray(2**32)

    def __load_localnet(self):
        self.localnet = []
        starttime = datetime.datetime.now()  
        count = 0
        with open(self.localnet_iplist_file, 'r') as f:
            for line in f:
                line = unicode(line.strip())
                count +=1
                try:
                    subnet = ipaddress.ip_network(line)
                    self.localnet.append(subnet)
                    start = int(subnet.network_address)
                    end = start + subnet.num_addresses
                    for x in range(start, end):
                        self.ips[x] = 1
                except Exception as e:
                    self.logger.exception(e.message)
        endtime = datetime.datetime.now() - starttime 
        self.logger.info("GroupLog loading %s localnets done, takes %s" % (count, endtime))          
```
上面这个函数，将所有的 IP 网段转换成 IP 集合， 存到 ips[] bitarray 当中。
加载需要24s 左右。 

### v4: 加载速度优化
```python

                    # for x in range(start, end):
                    #     self.ips[x] = 1
                    # This is far more faster than add one by one.
                    self.ips[start:end] = 1
```

```log
GroupLog loading 2128 localnets done, takes 0:00:24.227503 (set one by one)
GroupLog loading 2128 localnets done, takes 0:00:00.214876 (set by [start:end])
benchmark: call 300000 times in 0:00:02.242983
```

经过多次优化， 加载和判定速度得到极大优化。 


Python 多线程并不能利用多核

Threads are useful when the code is blocked by non bytecode execution, such as I/O or external process execution (C code, system calls, etc). If byte code execution is holding things up, the ProcessPool starts multiple interpreters that can execute in parallel. However, there is more overhead in spinning up these interpreters and in them communicating with the main thread through serialized representations (basically pickle or json over a socket if I understand correctly).


### multithread
* threading
* thread
### multiprocessing
* Pool
* Process
* Exchanging Objects
    * Queue
    * Pipe
* sync
    * Lock
* Sharing state
    * Value
    * Array
    * Manager



## GIL 
Global Interpreter Lock
sub-process v.s. thread

### concurrent.futures
* ThreadPoolExecutor
* ProcessdPoolExecutor


由于 GIL 的限制， python 的 multi-thread 并不能在多核上运行。 
Python 的 multi-thread 虽然将运行线程化了，但是只是在单核上运行。 这样， 对 cpu-intensive 的计算没有意义，对于 I/O 类型的运算才有意义。 


## msic
* `**kwargs`
* How does OS pip work?
* multiprocessing.Pool v.s. concurrent.futures.ProcessPoolExecutor



## GIL

tick

### interpreter instructions
```python
import dis
dis.dis(countdown)
```


str is text representation in bytes, unicode is text representation in characters.

