---
layout: post
title: "Java Global Try Catch"
tags: [java, exception]
---

Java 为程序员提供了非常方便的错误处理。当有某段代码可能会发生错误， 比如读文件不存在， 所写的代码就不能正常工作。 这种情况下， 通常需要附加的逻辑来处理错误情况。 直接的方式是将可能会发生错误的代码段用`try {}`包起来。 在`catch` 中处理错误发生之后的逻辑， 使得整体程序不至于崩溃。 

## Java Exception Handling
Java 提供`try  catch` 机制来捕获异常，方便程序员处理。
```java
try {
  // code that may break
  //...
}
catch (Exception e){
  // to handle the exception here. 
  // Usaually, just print out the exception stacktrace. 
  e.printStackTrace();
}
```

### 一个简单的例子

下面的代码演示了`try catch` 的简单使用：

```java
String filename = "/nosuchdir/myfilename";
try {
    // Create the file
    new File(filename).createNewFile();
} catch (IOException e) {
    // Print out the exception that occurred
    System.out.println("Unable to create "+filename+": "+e.getMessage());
}
```

## Global try catch? 
Java 程序员被要求在所有可能发生问题的代码段都要加上`try catch`. 幸好编译器有时会提醒你哪里需要添加。 对于一个不那么自信的程序员， 是不是需要在所有的代码块都加上`try catch` 呢？ 天哪， 那样的代码还能用吗？能用的话， 即使程序不会崩溃， 也不能完成正常的功能吧。 

在某些情况下， 你可能希望有一个全局的错误处理机制。 如果发生了某个你不能预料的错误，比如你的程序本来运行的好好的， 但是被某些杀毒软件强行夺取了某个文件的访问权限， 这时使得你的程序处于一个不稳定的状态，然后程序崩溃了。 这怎么办？ 你会难道要责怪用户吗？ 
或许有更好的选择。 

当这种不能预料的错误发生时， 你希望能有一个全局的默认的错误处理机制，让程序在错误发生时依然可以做些恢复工作， 至少可以提醒用户为什么出错了。 

这就是Global Exeption Handler 的作用。 

Java 对于线程提供了2个方法

* [setDefaultUncaughtExceptionHandler](http://docs.oracle.com/javase/1.5.0/docs/api/java/lang/Thread.html#setDefaultUncaughtExceptionHandler\(java.lang.Thread.UncaughtExceptionHandler\))

This is static method and sets for all threads. 
 
* [setUncaughtExceptionHandler](http://docs.oracle.com/javase/1.5.0/docs/api/java/lang/Thread.html#setUncaughtExceptionHandler\(java.lang.Thread.UncaughtExceptionHandler\))

set for a single thread.

下面是其说明
>
>public static void setDefaultUncaughtExceptionHandler(Thread.UncaughtExceptionHandler eh)

>Set the default handler invoked when a thread abruptly terminates due to an uncaught exception, and no other handler has been defined for that thread.
Uncaught exception handling is controlled first by the thread, then by the thread's ThreadGroup object and finally by the default uncaught exception handler. If the thread does not have an explicit uncaught exception handler set, and the thread's thread group (including parent thread groups) does not specialize its uncaughtException method, then the default handler's uncaughtException method will be invoked.
>
By setting the default uncaught exception handler, an application can change the way in which uncaught exceptions are handled (such as logging to a specific device, or file) for those threads that would already accept whatever "default" behavior the system provided.
>
Note that the default uncaught exception handler should not usually defer to the thread's ThreadGroup object, as that could cause infinite recursion.
>
Parameters:
eh - the object to use as the default uncaught exception handler. If null then there is no default handler.
>
Throws:
SecurityException - if a security manager is present and it denies RuntimePermission ("setDefaultUncaughtExceptionHandler")
Since:
1.5
>

The following [code](http://www.nomachetejuggling.com/2006/06/13/java-5-global-exception-handling/) illustrates an example:

```
//ExceptionHandlerExample.java
package com.air0day.machetejuggling;

public class ExceptionHandlerExample {
  public static void main(String[] args) throws Exception {

    Handler handler = new Handler();
    Thread.setDefaultUncaughtExceptionHandler(handler);

    Thread t = new Thread(new SomeThread(), "Some Thread");
    t.start();

    Thread.sleep(100);

    throw new RuntimeException("Thrown from Main");
  }

}

class Handler implements Thread.UncaughtExceptionHandler {
  public void uncaughtException(Thread t, Throwable e) {
    System.out.println("Throwable: " + e.getMessage());
    System.out.println(t.toString());
  }
}

class SomeThread implements Runnable {
  public void run() {
    throw new RuntimeException("Thrown From Thread");
  }
}
```

## Migrate to Android 



## Trap, Be careful


