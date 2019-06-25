---
title: 在java中如何判断一个整型数字的长度，到底是几位数
date: 2019-06-24 21:49:48
tags:
- Java
categories:
-[Java,小技巧]
---

如何将一个整型数字的位数算出，在java语言中。

<!--more-->

		Scanner scanner =new Scanner(System.in);
		int a=scanner.nextInt();
		System.out.println((a+"").length());


将数字转化为字符串，将字符串的长度算出即可。

也可以算double类型的数字的长度，但要减一，因为将小数点算作一个位数。

完整代码如下：



```java
import java.util.Scanner;
    public class Main {
    public static void main(String[] args) {
        Scanner scanner =new Scanner(System.in);
        int a=scanner.nextInt();
        System.out.println((a+"").length());

    }
}
```

