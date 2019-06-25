---
title: JDK与JRE的理解？JDK与JRE的区别是什么？什么是字节码？为什么采用字节码？
date: 2019-06-25 20:18:31
tags:
- Java
- 面试
- Java基础
categories:
-[Java,面试]
---

## JDK与JRE

### JDK

JDK是 Java Development Kit，是一个功能齐全的Java SDK。它拥有JRE所拥有的一切，还有Java的编译器(javac)和工具(javadoc与jdb)。

### JRE

JRE是Java运行时的环境。它是运行已经被编译的Java程序所需的所有内容的集合，包括Java虚拟机（JVM），Java类库，Java命令和其他的一些基础构件。但它不可以编写程序，它只能运行程序。

### 区别

如果你只运行Java程序的话，只需要安装JRE即可，如果你需要进行对Java源代码的修改或者编程新的文件，那么就需要安装JDK。  

但这个不是绝对，有的时候不是不进行开发就不需要安装JDK，**例如**，如果要使用到JSP部署Web应用程序，从技术上讲，您只是在应用程序服务器中运行Java程序。应用程序服务器会将JSP转换为Java Servlet，并且需要使用JDK来编译servlet。   

## JVM

JVM叫Java虚拟机（**Java Virtual Machine**），是用来运行Java字节码的虚拟机。它对不同的系统都有特定的实现，目的是为了使用相同的字节码，都会产出相同的结果。

## 字节码

字节码在Java中就是JVM可以理解的代码，拓展名为.class，他不面向任何特定的处理器，只面向虚拟机。Java通过字节码的方式，在一定程度上解决了传统解释型语言执行效率的问题，同时又保留了解释型语言可移植的特点。