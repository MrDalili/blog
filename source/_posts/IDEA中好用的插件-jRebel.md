---
title: IDEA中好用的插件------jRebel
date: 2019-06-07 19:56:58
tags:
- 教程
- java
- IDEA插件
categories: 教程
---

## jRebel

JRebel是一款用于javaEE开发的工具。它是一个可以实现热部署，节约开发人员时间以及效率的一款插件。  

<!-- more-->

它可以在开发人员不进行重新部署的情况下，即时的看到改变代码在进行重新编译后的结果。它也可以让你能够即时看到代码、类、资源等的变化情况。  

## 在IDEA中安装插件

1. 点击右上角的File -> Setting -> Plugins，搜索JRebel，点击安装。（激活我有时间会写一个，很简单，百度谷歌一下也可以的啦）  
   ![安装JRebel][1]    
  
2. 配置IDEA，连续按2次Shift，在弹出的框内输入Registry。打开后，寻找compiler.automake.allow.when.app.running，在后面的value处，打上对勾，退出该对话框  
   ![配置IDEA][2]  

3. 点击右上角的File -> Setting -> Build，Execution，Deployment，选择图中框起的2个选项. 
   ![配置自动编译][3]  

4. 配置JRebel的配置文件。右击项目根，在最下方找到JRebel，点击子目录中的Disable JRebel（配置文件我折腾俩天，差不多懂了在开一个或者接着写）  
   ![生成JRebel配置文件][4]   
   
5. 点击右上角的JRebel启动或者调试按钮即可。  

   ![按钮][5]









[1]: https://qiniuyun.ningdali.com/1967JRebel.png	"点击安装"
[2]: https://qiniuyun.ningdali.com/1967JRebel1.png	"配置IDEA"
[3]: https://qiniuyun.ningdali.com/1967JRebel2.png	"配置自动编译"
[4]: https://qiniuyun.ningdali.com/1967JRebel3.png	"生成JRebel配置文件"
[5]: https://qiniuyun.ningdali.com/1967JRebel4.png	"按钮"
