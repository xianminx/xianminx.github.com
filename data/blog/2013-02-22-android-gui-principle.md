---
layout: post
title: 'Android GUI 工作原理'
tags: [android]
---

Android View 工作原理
结构

Surface 对应内存中缓冲区。

SurfaceFlinger 服务进程
System Server 进程： SurfaceFlinger_client 客户端驱动: WindowManagerService
APK 应用进程： WindowManger

Java 层
Native 层
重要的类及其关系
Sample

View 绘制原理
