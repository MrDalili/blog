---
title: 手写JVM之简单的终端命令分析
date: 2019-06-22 14:07:00
tags:
- JVM学习
- Java  
categories:  
- [Java,JVM学习]
---

在命令行中，Java是可以用命令进行调用，所以我们先使用go语言来编写一个很简单的，可以查看vision的命令工具，如下图  

<!--more-->

### 准备工作
从跟目录开始配置整个项目目录  
|-jvmgo  
  |-ch01  
    |-cmd.go  
    |main.go  
![Java在命令行中使用java -version][1]    

![自己需要实现的-version][2]  

在这之前我先说一句，所有代码的意思我不单独做说明，因为我已经几乎给每一句话打了注释  
+ 我们在workspace/src/ch01中新建一个cmd.go。用来解析如同java -version这种命令的
```go
package main

//引包
import "flag"
import "fmt"
import "os"

//类似于java中类
type Cmd struct {
	helpFlag    bool
	versionFlag bool
	cpOption    string
	class       string
	args        []string
}

//方法
func parseCmd() *Cmd {
	//new一个Cmd
	cmd := &Cmd{}

	//调用方法
	flag.Usage = printUsage
	//如果是-help，那么显示这个，并将结果赋值给cmd结构体中的helpFlag，下面的大致都如此
	flag.BoolVar(&cmd.helpFlag, "help", false, "print help message")
	flag.BoolVar(&cmd.helpFlag, "?", false, "print help message")
	flag.BoolVar(&cmd.versionFlag, "version", false, "print version and exit")
	flag.StringVar(&cmd.cpOption, "classpath", "", "classpath")
	flag.StringVar(&cmd.cpOption, "cp", "", "classpath")
	flag.Parse()


	args := flag.Args()
	//如果args的长度大于0
	if len(args) > 0 {
		//将args[0]取出赋值给class
		cmd.class = args[0]
		//将数组第二个元素到最后一个元素赋值给args
		cmd.args = args[1:]
	}

	return cmd
}

func printUsage() {
	fmt.Printf("Usage: %s [-options] class [args...]\n", os.Args[0])
	//flag.PrintDefaults()
}
```
+ 添加一个主类，用来运行整个程序  
```go
package main

import "fmt"

func main() {
	cmd := parseCmd()

	if cmd.versionFlag {
		fmt.Println("version 0.0.1")
	} else if cmd.helpFlag || cmd.class == "" {
		printUsage()
	} else {
		startJVM(cmd)
	}
}

func startJVM(cmd *Cmd) {
	fmt.Printf("classpath:%s class:%s args:%v\n",
		cmd.cpOption, cmd.class, cmd.args)
}
```
这样我们就已经完成了这个小demo的编写。  
这也只是我们迈出的第一步，接下来我们要做的就是去加载类文件了。
