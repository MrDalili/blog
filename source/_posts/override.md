---
title: 重载和重写的区别?构造器 Constructor 是否可被 override?
date: 2019-06-25 20:36:01
tags:
- Java
- 面试
- Java基础
categories:
- [Java,面试]
---

+ 重载：

  + 一般发生在一个类中

<!--more-->

    + 方法名相同（必须）
    
    + 参数类型不同
    
    + 参数个数不同
    
    + 参数顺序不同
    
    + 方法返回值不同
    
    + 访问修饰符不同

  出现以上任意组合时，出现重载。重载发生在编译时。

+ 重写：

  + 发生在父类与子类以及接口与类之间：
    + 方法名相同
    + 参数列表相同
    + 返回值小于等于接口或者父类
    + 抛出的异常小于等于接口或者父类
    + 访问修饰符范围大于等于父类或者接口
  
  满足以上5个条件，即为重写

**构造器**不能被重写，因为构造器为父类的私有属性，所以就不能被orverride，但是它可以被overload，你在编写代码的时候会经常发现有很多类有多种构造器。
