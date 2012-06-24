---
layout: post
title: "github视通的jekyll真的很不给力"
tags: [github]
draft: true
---

一直以来想找一个简单的可以写技术博客的站点，要求很简单， 不需要什么酷的界面，也不需要什么炫的皮肤，只需要能够不错的展示代码和图片就可以了。 

github falvored markdown 对code block 很不错， 所谓的"fancy code block"。 看似简单的东西， 在实际的系统里面没有几个做得好的。 Github提供pages服务， 可以供写技术博客用。 背后使用的引擎是Jekyll， 这个东西是ruby写的， 以非常简单的方式来管理博客。 虽然Github使用的是Jekyll, Jekyll也主要是用markdown格式来写博客的， 要命的是， Jekyll不支持GFM， 使用什么所谓的maruku引擎渲染， 而不是github 所用的redcarpet. Ridiculous!估计这就是开源所带来的后果吧。  这就造成了使用GFM写的markdown post不能被Jekyll在Github pages上很好的展示出来。 
