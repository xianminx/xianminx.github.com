---
layout: 'post'
title: 'appcompat-v7 Theme demystified'
tags: [Android, theme, style, support-v4, actionbar]
date: '2014-08-20'
---

## support-v4

增加一些工具类，可以使用 Fragment, NotificationCompat, ViewPager 等。作为一个 jar 包提供，更多是一个工具类，通过 jar 包方式提供高版本系统的一些 API。

## support-v7

分三个组成部分:

- appcompat library
- gridlayout library
- mediarouter library

其中最重要的就是 appcompat，为 API 7-10 系统提供在 11 上新加的 ActionBar 的设计模式。所以如果你的应用只支持 API 11+，就可以不需要这个 library。

appcompat 的核心支持是 ActionBar。所以如果你决定你的应用要对 API 7-10 支持 ActionBar，需要将 Activity 继承 support/v7/app/ActionBarActivity，并且将 activity 的 theme 设为 Theme.AppCompat。

<iframe src="https://docs.google.com/viewer?srcid=0B0Ljn_Q37N4bY25HcU1rNklUR3M&pid=explorer&efh=false&a=v&chrome=false&embedded=true" width="740" height="600" frameBorder="0"></iframe>

这些 theme 都定义在 appcompat-v7 包中
v0 表示定义在 values/values.xml 中
v11 表示定义在 values-11/values.xml 中
v14 表示定义在 values-14/values.xml 中
app 表示应用定义的 style
在 v11 之后默认 holo 风格
还有对应的 Light 风格，在每个 Theme 的后面加上 .Light
