---
layout: post
title: "Android Build System"
tags: [andYroid]
---

Android build system is *make* based. 

In this document
Understanding the makefile
Layers
Building the Android Platform
Building the Android Kernel
Build Variants


## makefile
Understanding the makefile




A makefile defines how to build a particular application. Makefiles typically include all of the following elements:

1. Name: Give your build a name (LOCAL_MODULE := <build_name>).
1. Local Variables: Clear local variables with CLEAR_VARS (include $(CLEAR_VARS)).
1. Files: Determine which files your application depends upon (LOCAL_SRC_FILES := main.c).
1. Tags: Define tags, as necessary (LOCAL_MODULE_TAGS := eng development).
1. Libraries: Define whether your application links with other libraries (LOCAL_SHARED_LIBRARIES := cutils).
1. Template file: Include a template file to define underlining make tools for a particular target (include $(BUILD_EXECUTABLE)).

《Android 内核剖析》 第18章 Android 编译系统
1. Make based 
目标：条件
.PHONY 声明目标


1. Android 源码文件结构
```bash
drwxr-xr-x    6 lucas  staff   306 Mar  4 12:37 .repo
-r--r--r--    1 lucas  staff    87 Oct  1 00:56 Makefile
drwxr-xr-x    3 lucas  staff   136 Oct 15 08:17 abi
drwxr-xr-x   10 lucas  staff   476 Oct 15 08:17 bionic
drwxr-xr-x    5 lucas  staff   170 Mar  1 13:23 bootable
drwxr-xr-x    7 lucas  staff   442 Mar  4 12:00 build
drwxr-xr-x   11 lucas  staff   612 Mar  4 12:00 cts
drwxr-xr-x   17 lucas  staff   782 Mar  4 12:00 dalvik
drwxr-xr-x   18 lucas  staff   714 Nov 25 17:30 development
drwxr-xr-x   11 lucas  staff   374 Mar  4 11:29 device
drwxr-xr-x    3 lucas  staff   136 Oct 15 08:17 docs
drwxr-xr-x  164 lucas  staff  5610 Mar  4 12:01 external
drwxr-xr-x   15 lucas  staff   510 Jan 25 14:49 frameworks
drwxr-xr-x   10 lucas  staff   442 Oct  1 01:01 gdk
drwxr-xr-x   12 lucas  staff   408 Nov 25 17:32 hardware
drwxr-xr-x   12 lucas  staff   680 Mar  4 12:01 libcore
drwxr-xr-x    4 lucas  staff   306 Jan 28 02:08 libnativehelper
drwxr-xr-x    8 lucas  staff   714 Jan 28 02:08 ndk
drwxr-xr-x    4 lucas  staff   238 Mar  7 21:57 out
drwxr-xr-x    8 lucas  staff   272 Nov 25 17:33 packages
drwxr-xr-x    5 lucas  staff   238 Nov 25 17:33 pdk
drwxr-xr-x   11 lucas  staff   374 Mar  4 12:00 prebuilts
drwxr-xr-x   53 lucas  staff  2006 Jan 28 02:09 sdk
drwxr-xr-x    9 lucas  staff   306 Oct  1 01:04 system
drwxr-xr-x    3 lucas  staff   102 Mar  4 12:00 tools
```

### Make 系统
#### 编译命令
三张方式： 
1. 编译整个Android系统
```bash
source ./build/envsetup.sh
make PRODUCT-ful-crespo-eng

``` 
1. 编译子工程
```bash
make libbz
or mmm external bzip2
```

第19章 Android 系统编译
