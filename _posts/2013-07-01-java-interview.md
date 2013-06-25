---
layout: post
title: "Android Interview"
published: true
tags: [android, java, interview]
---

# Interview Questions Collection
1. [careercup](http://www.careercup.com/),There is an accompany book: Cracking the Coding Interview: 150 Programming Questions and Solutions

# Java Resources
1. Qura: [What questions are Java Software Engineers seeing the most of on technical interviews?](http://www.quora.com/What-questions-are-Java-Software-Engineers-seeing-the-most-of-on-technical-interviews)
1. Qura: [What are good interview questions to ask JAVA developers?] (http://www.quora.com/Java-programming-language/What-are-good-interview-questions-to-ask-JAVA-developers)
1. [Java puzzlers](http://www.javapuzzlers.com/) by Joshua Bloch. **RECOMMENDED** FOR SENIOR JAVA DEVELOPERS.
1. [Effective Java](http://books.google.com.hk/books/about/Effective_Java.html?id=ka2VUBqHiWkC) by Joshua Bloch. **RECOMMENDED** FOR ADVANCED JUNIOR JAVA DEVELOPERS.
1. [Java Concurrency in Practice](http://books.google.com.hk/books?id=EK43StEVfJIC&hl=zh-CN&source=gbs_similarbooks) by Tim Peierls, Brian Goetz, Joshua Bloch, Joseph Bowbeer, Doug Lea, David Holmes. **RECOMMENDED** FOR SERVER DEVELOPERS.
1. [Inside the Java Virtual Machine](http://www.artima.com/insidejvm/ed2/index.html) by Bill Venners. Online book available. 
1. [Books Related to the JVM](http://www.artima.com/jvm/booklist.html), a list of jvm books. 
1. [Thinking in Java](http://books.google.com.hk/books/about/Thinking_In_Java.html?id=j_O5QgAACAAJ) by Bruce Eckel. JAVA 101


# Sample Questions
1. Card Shuffle 
    * http://www.cs.swarthmore.edu/~newhall/cs21/s05/Homework/hw07.html
    * [The Danger of Naïveté](http://www.codinghorror.com/blog/2007/12/the-danger-of-naivete.html)
    * [Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](http://my.safaribooksonline.com/book/programming/java/032133678x/advanced-puzzlers/ch10lev1sec9) Puzzle 94: Lost in the Shuffle

The following shuffle method purports to shuffle its input array fairly. In other words, it purports to generate all permutations with equal likelihood, assuming that the underlying pseudorandom number generator is fair. Does it make good on its promise? If not, how do you fix it?

```java
import java.util.Random;

public class Shuffle {
    private static Random rnd = new Random();

    public static void shuffle(Object[] a) {
        for (int i = 0; i < a.length; i++)
            swap(a, i, rnd.nextInt(a.length));
    }

    private static void swap(Object[] a, int i, int j) {
        Object tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
}
```

1. [Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](http://my.safaribooksonline.com/book/programming/java/032133678x/advanced-puzzlers/ch10lev1sec9#X2ludGVybmFsX0h0bWxWaWV3P3htbGlkPTAzMjEzMzY3OHglMkZjaDA1bGV2MXNlYzEwJnF1ZXJ5PQ==) Puzzle 45: Exhausting Workout

```java
This puzzle tests your knowledge of recursion. What does this program do?

public class Workout {
    public static void main(String[] args) {
        workHard();
        System.out.println("It's nap time.");
    }

    private static void workHard() {
        try {
            workHard();
        } finally {
            workHard();
        }
    }
}
```



# Discussion

# TODOS
1. @知乎 如何面试android 工程师？ 从哪些方面考察？
    * 面试题库
    * 技术
    *    重构， 
    *    算法
    *    数据结构
    *    操作系统
    * 能力
    * 开放式思维
    * 知乎: [如何面试 Android 工程师？](http://www.zhihu.com/question/19733999)

2. 面试官如何写面试反馈？
1. 整理一个PPT 出来， 分topic 出面试题， 做分享
1. 整理知乎上的相关java / android 面试题
