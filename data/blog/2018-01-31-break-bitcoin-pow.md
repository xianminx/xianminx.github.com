---
layout: 'post'
title: 'Break Bitcoin Pow'
tags: [bitcoin]
date: '2018-01-31'
---

Miners are required to do a Proof of Work (PoW) computation to find a `x` such that  
`SHA256(digest+x) == 000102340...` with specified number of leading zeros.

This is a less strict requirement than birthday attack which requires to find `x` and `y` such that  
`SHA256(x) == SHA256(y)`.

I guess by inspecting the internal state of SHA256 algorithm when doing a hash, one can dramatically reduce the work to find a `x` to satisfy PoW, which means he can mine the block much faster than others, which could be big economic incentive to optimize mining process, or, in other words, break the current bitcoin PoW mechanism.

By using a neural network model to quickly find `x`, can be a promising approach.
