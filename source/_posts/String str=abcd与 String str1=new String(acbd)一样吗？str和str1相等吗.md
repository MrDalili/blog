---
title: String str="abcd"与 String str1=new String("acbd")一样吗？str和str1相等吗?
date: 2019-06-25 20:59:46
tags:
---

这俩种方法创建字符串对象事有一定的区别：

<!--more-->



+ **String str="abcd"**：是先检查字符串常量池种有没有"abcd"，如果字符串常量池种没有，则创建一个，然后str指向字符串常量池中的对象，如果有，则直接将str指向字符串常量池中的"abcd"。
+ **String str1=new String("acbd")**：是直接在堆内存空间创建了一个新的对象。  

一般来说推荐第一种方式创建字符串。

