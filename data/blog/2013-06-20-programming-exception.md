---
layout: 'post'
title: 'Exception'
tags: [java, programming]
date: '2013-06-20'
---

读书: Java Puzzlers, chapter exception  
Computer systems, a programmer's perspective.

1. 编程语言中的异常处理框架是如何设计的？  
   对于不同语言有何区别， 为什么需要异常处理？

2. 编程语言中的异常和系统中断有关系吗？
3. functional programming, "Programming Language, principles and paradigms" chap14, 了解PF 的基本原则和Java C 等区别
4. java Runtime 是干嘛用的？

：

1. Java 异常检查机制，

2. [10 Java Exception and Error Interview Questions Answers](http://javarevisited.blogspot.com/2013/06/10-java-exception-and-error-interview-questions-answers-programming.html)

3. What are some basic principles behind exception handling framework for a programming language (java)? Compare the exception handling framework for different languages.
4. Why does a language need exception handling?
5. How does compiler do exception check? How does runtime do exception check?
6. What is Java Runtime? @Quora, StackOverflow, zhihu
7. Exception Check mechanism in java?
8. Java try-catch-finally and return
9. Java Exception v.s. Error v.s. Throwable?
10. What is Exception Table in java byte code?
11. Runtime exception v.s. compile time exception
12. Checked exception v.s. unchecked exception
13. Check out java serialization framework
14. [ ]Read Function programming. "Programming Languages: Principles and Paradigms" Chap14. Understand the principles of functional programming and difference from OOP, Java, C.
15. Check Scala and Clojure, Haskell
16. What is JIT, Just in Time?
17. what is closures in Scala?
18. what is java Immutable data structure?
19. Check Scala (Script) for Android.
20.

Oracle Java Tutorial: Lesson: Exceptions  
http://docs.oracle.com/javase/tutorial/essential/exceptions/index.html

Definition: An exception is an event, which occurs during the execution of a program, that disrupts the normal flow of the program's instructions.

3 types of Exceptions:

1. checked exception
2. error
3. RuntimeException

Thinking in Java  
Chap10 通过异常处理错误  
将"描述实际工作的程序代码" 和"处理错误的程序代码"隔离开来。  
只要有任何异常被抛出， 异常处理机制便会找寻第一个参数类型于该异常类型相符的处理程序。 找到第一个catch类型符合的处理之后， 查找处理横线的动作便终止。 和switch case 不同， 在switch case中你得为每一个case子句加上break，才能避免继续逼进其他case。  
e.fillInStackTrace()  
RuntimeException  
如果某个RuntimeException 一路往外传递至main()而未能被捕捉，那么当程序终止时便会针对该异常，调用printStackTrace()

如何获取程序的stack trace

设计就是创造力的一种妥协。

Thinking in Java Chap 10, 通过异常处理错误  
CASSP: Chap 8, Exceptional Control Flow

Quora: Exception Handling

Android 中如何保持后台服务进程不被杀死， 内存不足被系统杀死， 被杀毒软件杀死。
