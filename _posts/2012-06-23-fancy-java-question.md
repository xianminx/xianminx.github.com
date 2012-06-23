---
layout: post
title: "一道很考验java功底的题目"
tags: [java]
---
<small class="meta final">
<a href = "http://xianminx.github.com/">Lucas Xu</a>  
</small>

问题 Challenge: can you write code that invokes `foo()`?

{% highlight java linenos %}
class Impossible {
	 public Impossible() {
		 throw new AssertionError("you cannot instantiate me"); 
	 }
	 public void foo() { 
		System.out.println("The impossible is possible!"); 
	}
}
{% endhighlight %}


这是来自Android team 的几位工程师的博客。 众志成城， 他们想出了很多解法。大家发挥一下想象力，看是不是可以找到解法。

