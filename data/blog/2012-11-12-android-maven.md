---
layout: "post"
title: 'Build android applications using maven'
tags: [android, maven]
date: "2012-11-12"
---

构建android项目的3种方式：

1. Eclipse + ADT
2. Android SDK tools + ant
3. Maven + Maven android plugin.

其中1和2 是的文件结构相同。 第3种方式由于采用maven通用的文件结构和1.2 的方式有很大区别。
使用maven来构建android 工程有很多优势。

1. 命令行下开发，对于真正的coder来说很方便
2. 部署等自动化很方便，不需要额外写太多的ant脚本

实际上Android 源码的编译开始从ant转向gradle [Using the new Build System](http://tools.android.com/tech-docs/new-build-system)

## Tools

要使用Maven 来构建Android 项目， 需要按照下面3个开源工具。

1. [Maven](http://maven.apache.org/) 提供Maven 环境
2. [maven-android-plugin](http://code.google.com/p/maven-android-plugin/wiki/GettingStarted) maven 针对Android 的插件，不用手动安装，由Maven托管。这也是Maven的nb之处。 不过需要手动设置一个环境变量，可参考链接。
3. [maven-android-sdk-deployer](https://github.com/mosabua/maven-android-sdk-deployer) 如果已经安装过ADT等，这个项目帮助将原来下载的android.jar包copy到maven 的目录下。(~/.m2/repository)
   随着 maven-android-plugin 项目的成熟， 第3个项目逐渐被deprecate。

4. 选择安装 [m2e-android](http://rgladwell.github.com/m2e-android/), 如果你想使用Eclipse 来开发。

### Reference Book Chapters:

[Maven: The Complete Reference Chapter 14. Android Application Development with Maven](http://www.sonatype.com/books/mvnref-book/reference/android-dev.html)

### 一些辅助项目。

- [BOOTSTRAP PROJECTS USING THE MAVEN-ANDROID-ARCHETYPES](http://stand.spree.de/wiki_details_maven_archetypes) 快速创建Android项目模版，犹如Eclipse ADT 的wizard， 不过是命令行的，配置好参数， 一键创建Android 项目。这个项目是由STAND (akquinet Stack for Android Development)创建。还包含很多其他android项目: BOOTSTRAP INDEPENDENCY LOGGING TESTS INTEGRATION PLAY FEEDBACK ENTERPRISE.

> 解决Android 资源重用的问题， 使用Rindirect.
> 重新生成一份 orginal.package.R.java

- [maven-android-plugin-samples](https://github.com/jayway/maven-android-plugin-samples)， 使用Maven Android Plugin的示例。