---
layout: post
title: "Android项目的依赖关系"
tags: [android, adt, eclipse]
---
<small class="meta final">
3月9日下午02:35，2012年 ，来自Xavier Ducrohet <br/>
原文：<a href="http://tools.android.com/recent/dealingwithdependenciesinandroidprojects">Dealing with dependencies in Android projects</a> by <a href = "http://tools.android.com/recent/dealingwithdependenciesinandroidprojects" > Xavier Ducrohet </a>
<br/>翻译： <a href = "http://xianminx.github.com/">Lucas Xu</a>  
</small>

在Android SDK Tools和Eclipse ADT 插件的第17版本 (revision 17)中，我们对Android项目的依赖关系管理做了很多改变。 

我们所做的第一个改变是调整基于 Ant 的编译系统和 Eclipse ADT 插件，使他们具有相同的行为。 

Android 项目包含源代码文件夹，以及对库项目 (android library projects) 和 jar 文件的依赖。 不需要其他多余的设置，只需要在project.properties中添加对于库项目的依赖，Android项目就会在动在 classpath 中添加以下依赖项： 

* libs/*.jar 的内容
* 库项目(library project)的输出。
* 库项目的 libs/*.jar 的内容。

这些依赖项，加上项目自身源代码编译的结果，被一起交给DEX工具，然后被转化成字节码从而打包到最终的APK当中。 

因为一个项目可能依赖于好几个使用相同的 jar 文件的库项目，Android 编译系统会检查所有所需的 jar 文件，检测出来自不同的库项目的重复 jar 文件，并删除这些重复的jar引用。这会防止可怕的"already added" DX错误。 

下面介绍了系统如何发现重复引用。 

<font color="red">重要的变化</font> 我们已经改变了库项目生成和打包R类的方式： 

   * R类不再被打包到库项目的输出 jar 包中。
   * 库项目不再为其所依赖的库项目生成R类。 只有主应用项目才会在生成本身R类的同时为所依赖的库项目生成R类。

这意味着库项目不能导入(import)另一个库项目的R类。 其实这是没有必要的，因为它们自身的R类包含所有必要的资源。 

请注意，应用程序的项目仍然可以导入所引用的库项目的R类，但是重申一遍，其实没有必要这么做， 因为他们本身的R类包括所有的资源。 
## Eclipse的具体变化
由于不光包含库项目，被称为"Library Projects"的动态class path容器 (dynamic class path container) 已更名为“Android Dependancies”。 

现在被库项目引用的纯 Java 项目也可以填充classpath容器。 如果这些Java项目也引用其他 Java 项目或 jar 文件，它们将被自动添加（现在也支持通过 user libraries引用的jar文件）。 


<font color="red">重要:</font> 仅当被引用的项被标记为"exported"时这才起作用。 请注意，默认情况下，当一个项目或jar文件被添加到项目的build path 中时是不会被标记为"exported"。 

库项目（ 以及它们所引用的lib/*.jar文件）总是会被标记为"exported"。


<font color="red">重要:</font> 如果你还在手动引用jar类库，而不是把他们放在libs目录下， 注意以下几点：

   * 如果该项目是一个 library project，应用项目默认情况下看不见这些jar 类库。 你必须把这些类库挪到"libs"子目录下。
   * 如果该项目是一个应用程序项目，你可以这样做，但你必须确保把引用的jar文件标记为"exported"。

下图介绍了如何将Java项目和jar类库标记为"exported"（Android Dependencies 容器不必被标为"exported"，反正它总是会被导出）：


![Mark references as exported in Eclipse](/graphics/ae6d0505e0138e239f8e7715fddf57ac.png "Mark references as exported in Eclipse")


再次强调一下， 重复的引用（包括引用的项目和 jar 文件）会被自动发现并且删除掉。 

## 依赖解析

当一个项目引用了两个库项目，都需要相同的jar文件，编译系统需要检测和解决这种重复。 

一个完整的依赖系统会将每个jar文件关联到一个完全限定名 (fully qualified name) 和一个版本号，以决定使用哪个版本。 

不幸的是，Android编译系统暂时还没有一个完整的依赖解析系统。 在此期间，我们按照下列规则实现了一个简单的系统： 

** 严格按照文件名来识别 jar 文件 **

> 这意味着 mylib.jar 和 mylib-v2.jar 是不同的两个文件，虽然它们实际上是不同版本的同一个类库， 他们都将被打包，从而可能导致 dx "already added" 错误。

对于具有相同文件名的 jar 文件，“相同版本”是指完全相同的文件。 

> 目前，我们的检测是非常基本的，只检查这些文件是不是有相同的大小和sha1 值。
>
> 如果两个库都包含在他们的libs文件夹名为mylib.jar文件，但是这两个文件是不同的，编译系统将不能指出这种依赖错误。
>
> 解决的办法: 如果它们是相同的类库，确保两个jar文件实际上是同一个。 如果是不同的两个类库，把他们重新命名为不同的jar包。

#### 特殊情况: android-support-v4.jar 和 android-support-v13.jar 
我们把这两个库当作特殊情况来处理， 因为-V13里面包含一个完整-V4的版本。 如果发现两者同时存在，只有V13被使用。

请注意，我们不能保证-V13中使用的-V4版本和其他老的类库使用到的-V4版本是相同的。 我们建议，当您更新您的项目与新版本的support library，你在同一时间更新您的所有项目，无论他们使用-V4还是-V13。










