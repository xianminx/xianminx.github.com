---
layout: "post"
title: 'Algorithm'
published: "true"
tags: [cloud]
date: "2018-03-12"
---

- [Divide and Conqure](#divide-and-conqure)

  - [Steps](#steps)

    - [Examples](#examples)

  - [求解法](#%E6%B1%82%E8%A7%A3%E6%B3%95)

    - [递归](#%E9%80%92%E5%BD%92)

    - [迭代](#%E8%BF%AD%E4%BB%A3)

  - [子问题类型](#%E5%AD%90%E9%97%AE%E9%A2%98%E7%B1%BB%E5%9E%8B)

    - [f(n) = f(n-1) , f(n-2)](#fn-fn-1-fn-2)

      - [e.g. Fibonacci 数列问题](#eg-fibonacci-%E6%95%B0%E5%88%97%E9%97%AE%E9%A2%98)

    - [f(n) = f(n/2) or more generally f(n/k)](#fn-fn2-or-more-generally-fnk)

      - [Binary Search 的三个模板:](#binary-search-%E7%9A%84%E4%B8%89%E4%B8%AA%E6%A8%A1%E6%9D%BF)

- [Dynamic Programming](#dynamic-programming)

  - [Steps](#steps)

- [Two Pointers](#two-pointers)

- [Recursion](#recursion)

  - [Recursively-defined functions](#recursively-defined-functions)

  - [tail recursion](#%08tail-recursion)

- [DFS](#dfs)

- [圆形问题 round / circle/ rotation](#%E5%9C%86%E5%BD%A2%E9%97%AE%E9%A2%98-round-circle-rotation)

  - [Tail Recursion](#tail-recursion)

    - [Tail Recursion vs. Non-Tail Recursion](#tail-recursion-vs-non-tail-recursion)

- [References:](#references)

  - [Divide and Conquer Strategy for Problem Solving - Recursive Functions ](#divide-and-conquer-strategy-for-problem-solving---recursive-functions)

# Divide and Conqure

## Steps

1. divide n -> P1, P2, ... Pk
2. 最小子问题直接求解
3. 递归/ 迭代求解子问题
4. 合并子问题的解

### Examples

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

#### e.g. Fibonacci 数列问题

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
复杂度降为 ` O(logn) ` .

### f(n) = f(n/2) or more generally f(n/k)

此类问题经常对应搜索空间减半，从而实现 ` O(logn) ` 的时间复杂度。
binary search 是典型此类问题。

**二分查找的形式: **

```java
while(l < r){
    if(==) return found result;
    else if (< ) l++
    else r--
}
```

#### Binary Search 的三个模板:

3 Parts of a Binary Search

1. Pre-processing: Sort if collection is unsorted
2. Binary Search: Using a loop or recursion to divide search space in half after each comparison
3. Post-processing: Determine viable candidates in the remaining space.

3 Templates for Binary Search

1. Template #1 is used to search for an element or condition which can be determined by accessing a single index in the array.

   - Search Condition can be determined without comparing to the element's neighbors (or use specific elements around it)

   - No post-processing required because at each step, you are checking to see if the element has been found. If you reach the end, then you know the element is not found

   - Initial Condition: left = 0, right = length-1

   - Termination: left > right

```java
int binarySearch(int[] nums, int target){
  if(nums == null || nums.length == 0)
    return -1;

  int left = 0, right = nums.length - 1;
  while(left <= right){
    // Prevent (left + right) overflow
    int mid = left + (right - left) / 2;
    if(nums[mid] == target){ return mid; }
    else if(nums[mid] < target) { left = mid + 1; }
    else { right = mid - 1; }
  }

  // End Condition: left > right
  return -1;
}
```

2.  It is used to search for an element or condition which requires accessing the current index and its immediate right neighbor's index in the array.

    - An advanced way to implement Binary Search.

    - Search Condition needs to access element's immediate right neighbor

    - Use element's right neighbor to determine if condition is met and decide whether to go left or right

    - Gurantees Search Space is at least 2 in size at each step

    - Post-processing required. Loop/Recursion ends when you have 1 element left. Need to assess if the remaining element meets the condition.

    - Initial Condition: left = 0, right = length

    - Termination: left == right

```java
int binarySearch(int[] nums, int target){
  if(nums == null || nums.length == 0)
    return -1;

  int left = 0, right = nums.length;
  while(left < right){
    // Prevent (left + right) overflow
    int mid = left + (right - left) / 2;
    if(nums[mid] == target){ return mid; }
    else if(nums[mid] < target) { left = mid + 1; }
    else { right = mid; }
  }

  // Post-processing:
  // End Condition: left == right
  if(left != nums.length && nums[left] == target) return left;
  return -1;
}
```

3. Template #3 is another unique form of Binary Search. It is used to search for an element or condition which requires accessing the current index and its immediate left and right neighbor's index in the array.

   - An alternative way to implement Binary Search

   - Search Condition needs to access element's immediate left and right neighbors

   - Use element's neighbors to determine if condition is met and decide whether to go left or right

   - Gurantees Search Space is at least 3 in size at each step

   - Post-processing required. Loop/Recursion ends when you have 2 elements left. Need to assess if the remaining elements meet the condition.

   - Initial Condition: left = 0, right = length-1

   - Termination: left + 1 == right

```java
int binarySearch(int[] nums, int target) {
    if (nums == null || nums.length == 0)
        return -1;

    int left = 0, right = nums.length - 1;
    while (left + 1 < right){
        // Prevent (left + right) overflow
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid;
        } else {
            right = mid;
        }
    }

    // Post-processing:
    // End Condition: left + 1 == right
    if(nums[left] == target) return left;
    if(nums[right] == target) return right;
    return -1;
}
```

e.g. _median of two sorted array a and b_

```java
/**
 * Find all pairs (i, j) in sorted array `arr` such that `arr[i] + arr[j] > s`
 */
public int countPairs(int[] arr, int s)
    int l = 0; r = arr.length-1;
    int count = 0;
    while(l < r){
        int t = arr[l] + arr[r];
        if(t >s) {
            count += r-l;
            r--;
        }
        else l++;
    }
    return count;
```

```java
/**
 * find two numbers with sum equal to s in a sorted array.
 */
public int[] countPairs(int[] arr, int s)
    int l = 0; r = arr.length-1;
    int count = 0;
    int[] result = {-1,-1};
    while(l < r){
        int t = arr[l] + arr[r];
        if(t == s) {
            result[0] = l;
            result[1] = r;
            return result;
        }else if(t<s){
            l++;
        }else if(t>s){
            r--;
        }
    }
    return result;
```

# Dynamic Programming

## Steps

1. 建模
2. 定义子问题
3. 迭代、递归公式
4. 边界条件

– Two eggs problem:
You have two identical eggs and you are given access to a 100 story building. You would like to know the highest floor for the egg not to break when dropped. The problem is the egg might break on the 1st floor, or even the 100th floor, you just don’t know. Find the maximum number of trials you need to conduct in order to find the answer.

– You have 5 identical jars. 4 of the jars contain balls with identical size weighing 10g each, while 1 of the jar contains balls weighing 9g each. You are given a digital scale, find out the 1 jar that has the 9g balls with only 1 weighing.

# Two Pointers

# Recursion

To iterate is human, to recurse divine (Anonymous)

```
solve( problem p )
    if ( p is simple )
        Solve the problem p directly
    else
        Divide p into new sub-problems p1, p2, ...
        r1 = solve(p1)
        r2 = solve(p2)
        Reassemble r1, r2, ... to solve p
    end
end
```

状态是相关变量的组合状态，一个变量相当于状态的一个分量

一次循环就是一轮状态转移（state transition）

初始状态 -> 按某种规则转移，有些状态属于终止状态，然后状态的某个变量就是所求

当前状态下，各个变量间互动，迁移，达到另一个状态，状态机的一般形式是 while (true) { //转移规则}， for (int i = 0; i < n; ++i ) {}这种是说，i这个状态分量每一轮的转移是固定的（++i），并且i == n 是触发状态机stop的方式之一。 状态机停止的一般形式是在转移的规则里的break或者 return

## Recursively-defined functions

- Factorial: n!

- Fibonacci numbers

- Ackermann Function

- Tower of Hanoi

- Fractals

- Tree and data searches

## tail recursion

递归带参数

打印目录树结构带缩进

```java
public void print(Node root){
    print(root, "");
}

private void print(Node node, String ident){
    System.out.println(ident+ node.val);
    for(Node child : node.children){
        print(child, ident+" ");
    }
}
```

# DFS

# 圆形问题 round / circle/ rotation

- Distributed Hashing Table

- 数组循环

- 队列 实现

- Link list

## Tail Recursion

The following section is exerpt from [Stackoverflow](https://stackoverflow.com/questions/33923/what-is-tail-recursion).

A tail call [tail recursion] is a kind of goto dressed as a call. A tail call happens when a function calls another as its last action, so it has nothing else to do. For instance, in the following code, the call to g is a tail call:

```lua
function f (x)
  return g(x)
end
```

After f calls g, it has nothing else to do. In such situations, the program does not need to return to the calling function when the called function ends. Therefore, after the tail call, the program does not need to keep any information about the calling function in the stack. ...

Because a proper tail call uses no stack space, there is no limit on the number of "nested" tail calls that a program can make. For instance, we can call the following function with any number as argument; it will never overflow the stack:

```lua
function foo (n)
  if n > 0 then return foo(n - 1) end
end
```

As I said earlier, a tail call is a kind of goto. As such, a quite useful application of proper tail calls in Lua is for programming state machines. Such applications can represent each state by a function; to change state is to go to (or to call) a specific function.

- In traditional recursion, the typical model is that you perform your recursive calls first, and then you take the return value of the recursive call and calculate the result. In this manner, you don't get the result of your calculation until you have returned from every recursive call.

  ```java
  public int f(int n){
      if(n==0)
          return 0;
      else{
          int pre = f(n-1);
          return g(pre);
      }
  }
  ```

- In tail recursion, you perform your calculations first, and then you execute the recursive call, passing the results of your current step to the next recursive step. This results in the last statement being in the form of "(return (recursive-function params))" (I think that's the syntax for Lisp). Basically, the return value of any given recursive step is the same as the return value of the next recursive call.

  ```java
  public int f(int n, int result){
      if(n==0)
          return result;
      else{
          result =  g(result, n);
          return f(n-1,result);
      }
  }
  ```

The consequence of this is that once you are ready to perform your next recursive step, you don't need the current stack frame any more. This allows for some optimization. In fact, with an appropriately written compiler, you should never have a stack overflow snicker with a tail recursive call. Simply reuse the current stack frame for the next recursive step. I'm pretty sure Lisp does this.

### Tail Recursion vs. Non-Tail Recursion

- In general, (non-tail) recursive function calls put parameters on the stack

  - Every call grows the stack

  - On return, the parameters are needed to compute the result (together with the partial result returned)

- In tail recursive functions, the parameters from the call before are not needed anymore

  - Instead, the result is directly handed to the parent

  - Hence, no parameters need to be put on the stack

- Languages that use tail recursion optimization realize this and don’t grow the stack

- The languages we cover next are optimized in this way So they are much more efficient when using recursion

# References:

## [Divide and Conquer Strategy for Problem Solving - Recursive Functions ](http://web.eecs.umich.edu/~aprakash/eecs282/lectures/11-recursion.pdf)

1. If the problem is small enough to be solved
   directly, do it
2. If not, find a smaller problem and use its
   solution to create the solution to the larger
   problem