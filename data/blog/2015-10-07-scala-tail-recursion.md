---
layout: "post"
title: 'Recursion in Scala'
published: "false"
tags: [scala, recursion]
date: "2015-10-07"
---

## Recursion

递归三要素:

1. 初始值
2. 递归公式
3. 终止条件

其中终止条件多数时候是比较明确的，比如求解 `f(n)` 的问题, 终止条件就是 `n` .

算法面试题中一大半可以使用递归来解决, 比如扔鸡蛋问题, 爬楼梯问题等等. 这种问题有一个典型特征, 非常明显, 即可以简化成:

> 求解 `f(n)`

有时候会故意加难, 变成2维 `f(nx, ny)` 3维甚至多维的问题.

这种问题的求解思路其实很简单. 有时找到实际的求解算法比较难, 是因为将实际问题建模成递归问题时, 三要素本身难以简单找到, 比如有时初始值不确定, 有时递归公式难以推导, 有时是终止条件不明确. 不管怎样, 寻找解的思路正确是首要的.

某些具体问题, 在采用递归时, 需要考虑中间的优化, 这就是动态规划(Dynamic Programming) 中用到的技巧. 记住了, 也是比较容易随机应变的.

### 案例

楼梯问题:

> 有一100阶层的楼梯，有三种走楼梯方式，一次走一阶，一次走两阶，一次走三阶。用算法实现，走完100阶总共有多少种走法

- 分析

这是典型的求 `f(n)` 的问题，并且终止条件非常明确，即 `n=100` ，需要寻找初始值和递归条件

- 初始值

人肉看下当 `n=0,1,2,3` 时 `f(0)` 的值

| n   | f(n) | 描述                               |
| --- | ---- | ---------------------------------- |
| 0   | 1    | 一种走法, 不走 [(0)]               |
| 1   | 1    | 一种走法, 走一步 [(1)]             |
| 2   | 2    | 2种走法, [(1,1), (2)]              |
| 3   | 4    | 4种走法, [(1,1,1),(1,2),(2,1),(3)] |

- 递归公式

寻找递归公式是比较难的过程, 和具体问题相关, 有时候需要变换各种角度来看问题. 这个问题是相对简单的. 假设我们知道了 `f(n)` , 如何求 `f(n+1)` 呢? 可以变换个思路, 当我们需要爬到 `n+1` 层时, 可以考虑最后一步的走法, 有三种可能, 分别是最后一步走:

* 1 个台阶, 上一步走到 `n` 层
* 2 个台阶, 上一步走到 `n-1` 层
* 3 个台阶, 上一步走到 `n-2` 层

这三种情况是互斥的, 并且包含了所有的可能, 从而, 我们有:

```
f(n+1) = f(n) + f(n-1) + f(n-2)
```

- 终止条件

```
n=100
```

从而这个问题非常简单了, 初始值, 递归公式, 终止条件都有了, 剩下的就是翻译成代码.

```scala
def f(n: Int): Int = {
  n match {
    case 0 => 1
    case 1 => 1
    case 2 => 2
    case _ => f(n - 1) + f(n - 2) + f(n - 3)
  }
}
val k = f(100)
```

实际运行上面代码, 我们会发现有个非常大的问题, 上面的代码会运行很久, 甚至可能会出现 stackoverflow. 由于每次计算 `f(n)` 都会重复计算 `f(n - 1)` , 大量重复, 所以可以考虑优化中间结果, 讲中间结果存储起来, 这就是动态规划了.

即我们申请一个数组, `v[100]` , 将计算好的 `f(n)` 存储到 `v[n]` 中

```scala
val array = new collection.mutable.ArrayBuffer[Int]()
array += 1
array += 1
array += 2

println(array)

def dpf(n: Int): Int = {
  println(s"dpf($n)")
  n match {
    case 0 => array.update(n, 1)
    case 1 => array.update(n, 1)
    case 2 => array.update(n, 2)
    case _ =>
      if (array.size < n) {
        val k = dpf(n - 1) + dpf(n - 2) + dpf(n - 3)
        array += (k)
        //array.update(n,k)
      }
  }
  val ret = array(n)
  println(s"n = $n. ret = $ret")
  ret
}
```

改进算法:

```scala
def nonfp(n: Int): Int = {
  val a = new Array[Int](3)
  a(0) = 1
  a(1) = 1
  a(2) = 2
  for (i <- 3 to n) {
    val sum = a(0) + a(1) + a(2)
    println(s"n=$i, fn=$sum")
    a.update(i % 3, sum)
  }
  a(n % 3)
}
```

注意当n 很大时, 上面的程序会溢出.

## 尾递归(tail-recursion)

上面的递归可以总结为:

- 初始条件: `f(0)`

- 递归公式: `f(n+1) = g(f(n))` , 可能是多阶, 即: `f(n+1) = g(f(n), f(n-1), f(n-2),...)`

- 终止条件 n

当计算 `f(n+1) = g(f(n))` 时, 会调用函数栈. 当n很大时, 栈很快溢出.

这个时候需要

```
def f(n) ={
   // compute tmp = f(n-1)
   // operate on temp, and we get
   val ret = g(tmp)
   ret
}
```

这里, 会产生递归调用, 并压栈. 但是有一类特殊的递归, 是不需要压栈的, 这就是尾递归. 所谓尾递归, 就是调用的递归函数是计算的最后一步, 即上面形式中的g 不存在,

```
def f(n) ={
   // operate on temp, and we get
   computer something
   f(n-1)
}
```

这个时候, 就不需要压栈, 从而也就不会产生 stackoverflow 了. 但是怎样转化呢, 起算, 将中间的计算结果传递过去, 就好了.

```
def f(n, acc) ={
   // operate on temp, and we get
   computer something
   val acc2 = compute(n-1, acc)
   f(n-1, acc2)
}
```

这样, 就省去了压栈的过程, 中间结果通过函数参数在递归中间传递.

关键因素是：设计递归函数时, 将递归函数的调用作为计算的最后一步.

### 尾递归和函数式编程

上面的尾递归函数其实是一个闭包, 满足闭包的条件. 闭包是函数式编程的核心概念. 所以学会尾递归对于学会函数式编程至关重要.

#### 闭包

尾递归

## Iteratee

Iteratee 如同Unix 的管道概念, 对数据流做变换.

其有三个状态: Cont, Done, Error

比Unix 的管道概念要轻, 不涉及进程后者现场.

Enumerator 是数据流的生产者, 相当于从console 或者文件读输入. Iteratee 本身不对资源做任何管理, 生产者将数据推给Iteratee, 生产者本身负责资源管理. Iteratee 是异步, 非阻塞的.

异步和非阻塞IO 是两个概念, 但是基本上一一块儿出现的.

- 异步

- 非阻塞IO

Scala 中的共轭概念: Future - Promise

step is a tail-recursive function (doesn’t unfold the full call stack at the end of recursion and returns immediately) preventing from stack overflow and behaving almost like the previous code with Iterator

what is scalaz Enumeratee Enumerator