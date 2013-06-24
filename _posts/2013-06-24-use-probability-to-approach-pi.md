---
layout: post
title: "Use Probability to approach Pi"
published: true
tags: []
---

Once I found this interview question: calculate Pi. 
Where, all we have learned to calculate Pi in our primary math class by using regular polygon to approach a circle. 

Today I am gonna show you a probability way. 

## Method
check the following graph for explanation. It is self-explainatory. 



<img src="https://docs.google.com/drawings/d/1m0kMxt0QRv5hsOLwGUqvUM0TbllT6sZcIfPpFEQpsso/pub?w=960&amp;h=720">

## Code
https://gist.github.com/xianminx/b59eef29b8137827f1f0#file-pi-java

```java
class Pi{ 
        public static void main(String[] args){
                if(args.length < 1)
                                System.exit(0);
 
                long iter = Long.parseLong(args[0]);
                double pi = calculate(iter);
                System.out.println(String.format("after %d iterations, pi is %f", iter, pi ));  
        }   
 
        public static double calculate(long simNum){
                long i =0L;
                long count =0L;
                while(i++<simNum){
                        double x = Math.random();
                        double y = Math.random();
                        double result = x*x+y*y;
                        if(result < 1.0D){
                                count++;
                        }   
                }   
                return 4.0D* count/simNum;
        }   
 
}
 
```

## Experiment
```log
lucas@lucas-ubuntu:~/dev/workspace/pi$ java Pi 1000
after 1000 iterations, pi is 3.032000
lucas@lucas-ubuntu:~/dev/workspace/pi$ java Pi 10000
after 10000 iterations, pi is 3.137200
lucas@lucas-ubuntu:~/dev/workspace/pi$ java Pi 100000
after 100000 iterations, pi is 3.140240
lucas@lucas-ubuntu:~/dev/workspace/pi$ java Pi 1000000
after 1000000 iterations, pi is 3.144108
lucas@lucas-ubuntu:~/dev/workspace/pi$ java Pi 10000000
after 10000000 iterations, pi is 3.141199
lucas@lucas-ubuntu:~/dev/workspace/pi$ java Pi 100000000
after 100000000 iterations, pi is 3.141486
lucas@lucas-ubuntu:~/dev/workspace/pi$ 
```

