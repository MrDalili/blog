---
title: tomcat配置jks安装证书
date: 2019-06-10 11:17:09
tags:
- 教程
- 服务器
categories: 教程
---

一直都想自己弄一个https，但就是没有一个合适的契机，这次逼得没办法，弄了一下，写个教程，自己以后有遇见可能还会忘记，就当写个备忘录。

<!--more-->

## 申请一个免费的HTTPS证书

现在可以免费申请https证书的地方很多，腾讯云，阿里云，七牛云等都可以，按照教程差不多1的时间就可以将免费的亚洲Trust Asia TLS

证书。  

## 下载证书

你申请好https证书后，找到下载的链接将其下载下来，貌似目前证书下载的时候会分为tomcat，apache，niginx等服务器证书，我们选择tomcat就可以了。  

## 上传证书

将下载后的后缀为.jks的证书文件上传至你服务器，你可以放在任意路径，但一般都放在tomcat中的conf目录下。  

## 配置文件

这时候我们就要配置对应的配置文件，打开server.xml配置文件，找到对应的位置，添加下面这段配置信息:  

```xml
 <Connector port="443  端口是可以修改的，443是https的默认端口" protocol="org.apache.coyote.http11.Http11NioProtocol"
               maxThreads="150" SSLEnabled="true">
        <SSLHostConfig>
            <Certificate certificateKeystoreFile="conf/你的证书的全程  xxxx.jks"
                         type="RSA" certificateKeystorePassword="对应的password" />
        </SSLHostConfig>
 </Connector>    
```

## 我遇见的坑

+ 一开始我是换端口了，换成4884，一直上不去，后面发现是没有在服务器开启这个端口
+ 再有就是，检查一下你的jks的文件名字，看看会不会有一些莫名其妙的空格，我的就是在.jks前面有个莫名其妙的空格，我在配置文件里面配置的是ningdali.com.jks，人家文件名字是ningdali.com .jks中间多了个空格，坑死我了，弄了2天  
  
## 如果大家还碰见什么问题可以跟我探讨哦