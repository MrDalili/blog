---
title: 使用宝塔安装mysql时出现的问题以及解决的方案
date: 2019-06-15 22:49:54
tags:
- 教程
- bug
- mysql
categories: mysql
---

在linux中安装mysql真的是一件头疼无比的事情，简单说就是头皮发麻。这次使用宝塔安装mysql一样，同样没让我省心，这样的过程已经重复很多次了，这次来记录一下这个过程。  

<!--more-->

+ **首先会遇见这个错误** 

  ![图片][1]  
  
  这时候发现这个问题后，一般会有2种情况导致：
  
  + linux上3306端口没打开或者说宝塔阿里云上的安全组没有打开  
  
    > 一般通过打开端口或者进宝塔或阿里云安全组配置界面打开端口
  
  + 权限不够，需要增加权限，在服务器本机进入mysql后按步骤输入以下sql语句  
  
    ```mysql
    use mysql;
    grant all privileges on *.* to root@"%" identified by "你要修改的密码";//让任何一个远程主机都可以访问数据库  
    FLUSH PRIVILEGES;  //刷新sql配置  
    ```

+ 好了错误解决了  
+ 到了这个时候跟大家分享一下自己的经验  
  我发现原来是我的ip地址输入错误了。。。。但是我的这个教程确实可以解决这个问题，orz。





[1]: https://qiniuyun.ningdali.com/blog/19515mysql.png