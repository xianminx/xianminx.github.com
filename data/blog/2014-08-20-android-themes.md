---
layout: post
title: 'appcompat-v7 Theme demystified 			'
published: true
tags: [Android, theme, style, support-v4, actionbar]
---

## support-v4

增加一些工具类， 可以使用Fragment, NotificationCompat, ViewPager等。 作为一个jar包提供， 更多是一个工具类， 通过jar包方式提供高版本系统的一些API。

## support-v7

分三个组成部分:

- appcompat library
- gridlayout library
- mediarouter library

其中最重要的就是appcompat, 为API 7-10 系统提供在11上新加的ActionBar的设计模式。 所以如果你的应用只支持API 11+， 就可以不需要这个library。

appcompat 的核心支持是ActionBar。所以如果你决定你的应用要对API 7-10 支持ActionBar, 需要将Activity 继承 support/v7/app/ActionBarActivity， 并且将activity 的theme 设为Theme.AppCompat。

<iframe src="https://docs.google.com/viewer?srcid=0B0Ljn_Q37N4bY25HcU1rNklUR3M&pid=explorer&efh=false&a=v&chrome=false&embedded=true" width="740" height="600" frameborder="0"></iframe>

这些theme都定义在appcompat-v7包中
v0 表示定义在values/values.xml 中
v11 表示定义在values-11/values.xml 中
v14 表示定义在values-14/values.xml 中
app 表示应用定义的style
在v11 之后默认holo 风格
还有对应的Light 风格， 在每个Theme 的后面加上.Light
