---
layout: "post"
title: 'Math for algorithms'
published: "true"
tags: [algorithm]
mathjax: "true"
date: "2018-10-23"
---

# Math basics for algorithm

## A.1 求和公式及其性质

- 等差
  $$
  \sum_{k=1}^n k = \frac{n(n+1)}{2}
  $$

$$
\sum_{k=1}^n k^2 = \frac{n(n+1)(2n+1)}{6}
$$

$$
\sum_{k=1}^n k^3 = \frac{n^2(n+1)^2}{4}
$$

- 线性性质

$$
\sum_{k=1}^n (ca_k+b_k) = c\sum_{k=1}^n a_k + \sum_{k=1}^n b_k
$$

$$
\sum_{k=1}^n \Theta\left(f(k)\right) = \Theta \left( \sum_{k=1}^n f(k) \right)
$$

- 几何级数

$$
\sum_{k=0}^n x^k = 1 + x + x^2 + \ldots + x^n = \frac{x^{n+1} - 1}{x - 1}
$$

$$
\sum_{k=0}^{\infty} x^k = \frac{1}{x - 1}
$$

- 调和级数

$$
H_n = 1 + \frac{1}{2} + \frac{1}{3} + \frac{1}{4} + \ldots + \frac{1}{n} = \sum_{k=1}^n \frac{1}{k} = \ln{n} + O(1)
$$

- 级数积分与微分

$$
\sum_{k=0}^{\infty} kx^k = \frac{x}{(1-x)^2}
$$

- 列项级数 telescopes

$$
\sum_{k=1}^{n} (a_k - a_{k-1}) = a_n - a_0
$$

$$
\sum_{k=0}^{n-1} (a_{k-1} - a_k) = a_0 - a_n
$$

$$
\sum_{k=1}^{n-1} \frac{1}{k(k+1)} =
\sum_{k=1}^{n-1} \left(\frac{1}{k} - \frac{1}{k+1}\right) = 1 - \frac{1}{n}
$$

- 乘积
  $$
  \lg\left(\prod_{k=1}^{n} a_k \right) = \sum_{k=1}^{n} \lg{a_k}
  $$

## A.2 确定求和时间的界

- 数学归纳法

- 确定级数中各项的界

- $$
  \sum_{k=1}^{\infty} \frac{1}{k}  = \lim_{n \to \infty} {\sum_{k=1}^{n} \frac{1}{k}} = \lim_{n \to \infty} {\Theta(\lg n)} = \infty
  $$

$$
H_n = \sum_{k=1}^n \frac{1}{k} = 1 + \frac{1}{2} + \frac{1}{3} + \frac{1}{4} + \ldots + \frac{1}{n}  \leq \ln{n} + 1
$$

- 通过积分求和的近似

  - if $f(x)$ 单调递增:

    $$
      \int_{m-1}^{n} f(x)\,dx  \leq \sum_{k=m}^n f(k) \leq  \int_{m}^{n+1} f(x)\,dx
    $$

  - if $f(x)$ 单调递减:
    $$
      \int_{m}^{n+1} f(x)\,dx  \leq \sum_{k=m}^n f(k) \leq  \int_{m-1}^{n} f(x)\,dx
    $$

  $$
  H_n = \sum_{k=1}^n \frac{1}{k} \geq \int_{1}^{n+1} \frac{1}{x}\,dx = \ln{(n+1)}
  $$

  $$
  \sum_{k=2}^n \frac{1}{k} \leq \int_{1}^{n} \frac{1}{x}\,dx = \ln{(n)}
  $$

  $$
  H_n = \sum_{k=1}^n \frac{1}{k} \leq \ln{n} + 1
  $$

## 重点

- Illustrate function call stack

- Describe how to convert recursion to iteration

  - one function call

  - 2 or more function calls

  - tail recursion

- PERMUTATION

```java
PERM(A, k)
  if(k == n)
    PRINT(A)
  for i = 1 to n
    SWAP(A, i, k)
    PERM(A, k+1)
    SWAP(A, i, k)

PERM(A, 1)
```

- DFS and stack

- BFS and queue