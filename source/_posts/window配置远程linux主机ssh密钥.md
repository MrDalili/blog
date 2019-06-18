---
title: window配置远程linux主机ssh密钥
date: 2019-06-16 13:13:59
tags:
- linux 
- 教程 
categories: linux
---

<!--more-->


## 实现过程  

1. 生成公私钥对

   ```linux
   ssh-keygen
   ```
   
   碰见需要输入的按回车即可，使用默认的配置
   
2. 将公钥导入authorized_keys文件,并将私钥保存到本地计算机

   ```linux
   cat id_rsa.pub >>authorized_keys
   cat authorized_keys
   ```
   
3. 将其中的其中的id_rsa拿到本地，即可。