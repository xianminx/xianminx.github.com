---
layout: post
title: "Android Interview"
published: true
tags: [android, java, interview]
---

# Interview Questions Collection
1. [careercup](http://www.careercup.com/),There is an accompany book: Cracking the Coding Interview: 150 Programming Questions and Solutions
1. Quora:[Java Interview Questions](http://www.quora.com/Java-Interview-Questions). A collection of java interview questions on quora. 
# Java Resources
1. Qura: [What questions are Java Software Engineers seeing the most of on technical interviews?](http://www.quora.com/What-questions-are-Java-Software-Engineers-seeing-the-most-of-on-technical-interviews)
1. Qura: [What are good interview questions to ask JAVA developers?] (http://www.quora.com/Java-programming-language/What-are-good-interview-questions-to-ask-JAVA-developers)
1. [Java puzzlers](http://www.javapuzzlers.com/) by Joshua Bloch. **RECOMMENDED** FOR SENIOR JAVA DEVELOPERS.
1. [Effective Java](http://books.google.com.hk/books/about/Effective_Java.html?id=ka2VUBqHiWkC) by Joshua Bloch. **RECOMMENDED** FOR ADVANCED JUNIOR JAVA DEVELOPERS.
1. [Java Concurrency in Practice](http://books.google.com.hk/books?id=EK43StEVfJIC&hl=zh-CN&source=gbs_similarbooks) by Tim Peierls, Brian Goetz, Joshua Bloch, Joseph Bowbeer, Doug Lea, David Holmes. **RECOMMENDED** FOR SERVER DEVELOPERS.
1. [Inside the Java Virtual Machine](http://www.artima.com/insidejvm/ed2/index.html) by Bill Venners. Online book available. 
1. [Books Related to the JVM](http://www.artima.com/jvm/booklist.html), a list of jvm books. 
1. [Thinking in Java](http://books.google.com.hk/books/about/Thinking_In_Java.html?id=j_O5QgAACAAJ) by Bruce Eckel. JAVA 101
1. The Java Job Interview Companion
1. Cracking the Coding Interview by Gayle Laakmann McDowell
1. Quora: [What are good books to test one's programming skills?](http://www.quora.com/Computer-Science/What-are-good-books-to-test-ones-programming-skills)
1. Wiki:[List of data structures](http://en.wikipedia.org/wiki/List_of_data_structures)
1. Wiki:[List of algorithms](http://en.wikipedia.org/wiki/List_of_algorithms)
1. Programming Interviews Exposed: Secrets to Landing Your Next Job
1. Coding Interviews By Harre He . A Press
1. Cracking the coding interview by Gayle as mentioned in other posts
1. [Cracking the coding interview--问题与解答](http://hawstein.com/posts/ctci-solutions-contents.html)
1. Algorithms For Interviews (9781453792995): Adnan Aziz, Amit Prakash: Books
1. Programming Challenges by Steven Skiena
1. Elements of Programming Interviews.
1. Cracking the Coding Interview: 150 Programming Questions and Solutions
1. Cracking The IT Interview 2nd  Edition -
1. Data Structures and Algorithms Made Easy 2nd Edition - I strongly recommend this book 
1. Cracking the C, C++ and Java Interview 1st Edition -
1. Test your C Skills - Yashwant Kanetkar
1. Test your C ++ Skills - Yashwant Kanetkar
1. Exploring C - Yashwant Kanetkar
1. Test Your Unix skills - Yashwant Kanetkar
1. [Top 15 Java threading interview questions asked in Investment banks](http://javarevisited.blogspot.in/2011/07/java-multi-threading-interview.html)


I mostly agree with John Kurlak's answer. Personally I feel Cracking the Coding Interview: 150 Programming Questions and Solutions is a good choice if you only know Java. Programming Interviews Exposed is a little elementary and the materials actually need to be updated. Elements of Programming Interviews: 300 Questions and Solutions seems for people who actually want to pass all interviews including the hardest one after concluding all reviews on Amazon, and it is mainly written in C++ which makes this as a great choice for people who can understand on C++.


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

1. 
> Write a program that prints the numbers from 1 to 100. But for multiples of three print “Fizz” instead of the number and for the multiples of five print “Buzz”. For numbers which are multiples of both three and five print “FizzBuzz”.

1. 
> Clock puzzles - find the angle between hr,min,sec handles, etc



# Online Tests
1. [Test For Geeks](http://tests4geeks.com/test/java), including java and android tests. Extremely challenging. 
1. [Fizz Buzz Test](http://c2.com/cgi/wiki?FizzBuzzTest)
1. [Brainbench test](http://www.brainbench.com/xml/bb/common/testcenter/taketest.xml?testId=115) 


# Fields
1. Java Collection
1. Multi Threading
1. GC
1. Design Patterns
1. Algorithms
1. Data Structure
1.   


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



## Android 面试题
1. Android 中线程与线程，进程与进程之间如何通信?
1. activity，intent 和 service 是什么关系？
1. handler 机制的原理是什么？
1. 横竖屏切换时候 activity 的生命周期？
