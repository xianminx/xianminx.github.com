---
layout: 'post'
title: '字符串匹配算法'
tags: [string, trie, pattern matching]
date: '2016-09-21'
---

## Suffix Tree 后缀树

### 模式匹配问题

> 字符串模式匹配问题定义：
>
> - 输入: 一个字符串模式 Pattern, 一个字符串文本 Text.
> - 输出: 模式 Pattern 作为子串出现在文本 Text 中的所有位置.

### 近似模式匹配问题

> 近似字符串模式匹配问题定义：
>
> - 输入: 一个字符串模式 Pattern, 一个字符串文本 Text，正整数 d.
> - 输出: 与模式 Pattern 距离最多为 d 的所有子串出现在文本 Text 中的所有位置.
