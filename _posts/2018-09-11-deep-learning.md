---
layout: post
title: "Deep Learning"
published: true
tags: [es6]
mathjax: true
jsarr: 
- https://cdn.rawgit.com/mathjax/MathJax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML
- _includes/mathjax_conf.js

---


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