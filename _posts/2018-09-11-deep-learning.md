---
layout: post
title: "Deep Learning"
published: true
tags: [es6]
mathjax: true
---


- [ECMAScript 6 Primer](#ecmascript-6-primer)
    - [第1章 ECMAScript 6 简介](#%E7%AC%AC1%E7%AB%A0-ecmascript-6-%E7%AE%80%E4%BB%8B)
    - [第2章 `let` 和 `const` 命令](#%E7%AC%AC2%E7%AB%A0-let-%08%E5%92%8C-const-%E5%91%BD%E4%BB%A4)
        - [2.1 `let`](#21-let)
        - [2.2 `const`](#22-const)
        - [顶层对象](#%E9%A1%B6%E5%B1%82%E5%AF%B9%E8%B1%A1)
    - [第 3 章 变量的解构赋值 Destructuring assignment](#%E7%AC%AC-3-%E7%AB%A0-%E5%8F%98%E9%87%8F%E7%9A%84%E8%A7%A3%E6%9E%84%E8%B5%8B%E5%80%BC-destructuring-assignment)
        - [3.1 数组的 Destructuring assignment](#31-%E6%95%B0%E7%BB%84%E7%9A%84-destructuring-assignment)
        - [3.2 对象的解构赋值](#32-%E5%AF%B9%E8%B1%A1%E7%9A%84%E8%A7%A3%E6%9E%84%E8%B5%8B%E5%80%BC)
        - [Map](#map)
    - [TODO:](#todo)
    - [Q & A](#q--a)

# Deep Learning



$$
a = \sigma(z) = \frac 1 {1+e^{-z}} \\
\frac {\partial \sigma} {\partial z} = \sigma(1-\sigma)
$$

$$
z_j^{l+1} = \sum_{k=1} (w_{jk}^la_k^l) + b_j^{l+1} 
$$
$$
z= w \cdot a + b
$$

Cost for sample $x$
$$
C_x= \frac 1 2 \sum_{j=1}^m (y_j-a_j)^2
$$

total Cost: 

$$
C= \frac 1 2 \sum_{x}C_x
$$

the objective function:
$$
min(C), w.t. w_{jk}, b_j
$$

$$
\frac {\partial C_x} {\partial z_j^L} = ( a_j^L - y_j) \frac {\partial a_j^L} {\partial z_j^L} \\
=(y_j - \sigma)\cdot \sigma \cdot (1-\sigma) \\
\sigma = a_j^L
$$

define: 
$$
\delta^l_j \equiv \frac {\partial C} {\partial z_j^l} \\
$$

$$
z_j^{l+1} = \sum_{k=1} (w_{jk}^l\sigma(z_k^l) + b_j^{l+1}  \\
\frac {\partial z_j^{l+1}} {\partial z_k^{l}} = w_{jk} \cdot \sigma^{\prime} =  w_{jk}^{l+1} \cdot \sigma(z_k^{l})(1-\sigma(z_k^{l}))
$$
to z
$$
\frac {\partial C_x} {\partial z_k^l} = \sum_j { \frac {\partial C_x} {\partial z_j^{l+1} } \cdot \frac {\partial z_j^{l+1}} {\partial z_k^{l}} }\\

\delta^l_k = \sum_j  \delta^{l+1}_j \cdot {\frac {\partial z_j^{l+1}}  {\partial z_k^{l} }}

$$
Output layer: 
$$
\delta^L_j \equiv \frac {\partial C} {\partial z_j^L} \\
=\frac {\partial C} {\partial a_j^L} \cdot \sigma^{\prime}(z_j^L) \\
=  ( a_j^L - y_j) \cdot \sigma(z_j^L) \cdot (1 - \sigma(z_j^L))
$$

matrix based: 
$$
\delta^L \equiv \frac {\partial C} {\partial z^L}  \\
= \nabla_aC \odot {\sigma^{\prime}(z^L)} \\
= ( a^L - y) \odot {\sigma^{\prime}(z^L)}
$$
back propagation: 

$$

\\
\delta^l_k = \sum_j {\delta^{l+1}_k}

$$
$$
\delta^L = \nabla_aC \odot {\sigma^{\prime}(z^L)} \\

\delta^l = ((w^{l+1})^T \delta^{l+1}) \odot {\sigma^{\prime}(z^l)} \\

$$

with $w_{jk}$
$$
\nabla_{b^l}C = \delta^l \\
\nabla_{w^l}C = \delta^l \sigma^{l-1} \\

$$