---
layout: post
title: "Algorithm"
published: true
tags: [cloud]
---


# Divide and Conqure

## Steps
1. divide n -> P1, P2, ... Pk
2. 最小子问题直接求解
3. 递归/ 迭代求解子问题
4. 合并子问题的解

### e.g.
Binary search a sorted array a[i]
1. divide: n -> (0 -- n/2) (n/2 -- n)
2. 最小子问题直接求解: n = 0, 1 
3. 递归/ 迭代求解子问题: each step, search either half.
4. 合并子问题的解: 最后一个子问题的解就是整个问题的解

## 求解法
### 递归
递归是最简单的形式
### 迭代
部分递归可以转换为迭代

## 子问题类型
### f(n) = f(n-1) , f(n-2)
e.g. Fibonacci 数列问题
此类问题依赖前面问题的求解， 如果是迭代求解可以缓存前面几个问题的解结果。 如果递归则不用

比如递归: 

```java
public int fibonacci(int n){
    if(n == 0 || n ==1) return n;
    return fibonacci(n-1)+ fibonacci(n-2); 
}
```

如果是迭代: 缓存中间结果。 

```java
public int fibonacci(int n){
    if(n == 0 || n ==1) return n;
    int f1 = 0;
    int f2 = 1;
    for(int i = 2; i<=n; i++){
        int t = f2;
        f2 = f1+t;
        f1 = t;
    }
    return f2;
}
```

还有一种更加绝妙的解法, 注意

```
f(n+1) = f(n) + f(n-1)
```

所以有:
```
[f(n+1) f(n)  ]       = [f(n)      f(n-1)] * [1  1]    = [1  1]^n
[f(n)   f(n-1)]         [ f(n-1)   f(n-2)]   [1  0]      [1  0]
```

通过矩阵的 n 次幂， 可以解出 F(n)

这里可以使用 Divide & Conqure 技巧的就是求解幂。 

```java
public double pow(x, n){
    if(n==0) return 1;
    int half = pow(x, n/2);
    if(n%2 ==1)
        return half * half * x;
    else 
        return half * half;
}
```
将上面的 乘法 * 换成矩阵乘法就可以求解 f(n) 了。 
复杂度降为 `O(logn)`.




### f(n) = f(n/2) or more generally f(n/k)

此类问题经常对应搜索空间减半，从而实现 `O(logn)` 的时间复杂度。 
binary search 是典型此类问题。 

**二分查找的形式: **

```java
while(l < r){
    if(==) return found result;
    else if (< ) l++
    else r--
}
```
Binary Search 的三个模板: 

e.g. *median of two sorted array a and b*


e.g. Find all pairs (i, j) in sorted array `arr` such that `arr[i] + arr[j] > s`



```java
public int countPairs(int[] arr, int s)
    int l = 0; r = arr.length-1;
    int count = 0;
    while(l < r){
        int t = arr[i] + arr[j];
        if(t >s) {
            count += r-l;
            r--;
        }
        else l++;
    }
    return count;
```






# Dynamic Programming
## Steps
1. 建模
2. 定义子问题
3. 迭代、递归公式
4. 边界条件
5. 