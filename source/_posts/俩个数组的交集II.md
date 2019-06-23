---
title: 俩个数组的交集II
date: 2019-06-23 19:43:50
tags:
- 算法
categories: 
- [算法,数组]
- [leetCode]
---

给定两个数组，编写一个函数来计算它们的交集。

<!--more-->

**示例 1:**

```
输入: nums1 = [1,2,2,1], nums2 = [2,2]
输出: [2,2]
```

**示例 2:**

```
输入: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出: [4,9]
```

**说明：**

- 输出结果中每个元素出现的次数，应与元素在两个数组中出现的次数一致。
- 我们可以不考虑输出结果的顺序。

## 思路

除了暴力法之外，提供2个网上比较流行的思路

+ Hash表

​       首先将一个数组以内容为key，出现的次数为value初始化一个hashmap，然后再去从头遍历另外的一个数组，碰见一个数去hash表中查一下，有没有，有的话就放到集合中，出现的次数减一，遍历完以后就是我们要的交集

+ 双指针法

​        先将俩个数组排序，都从第一个元素开始，哪边小那边向后移动，相同的话，就在集合中加入这个元素，不相同的话，继续移动，一个数组遍历完就结束

## 代码

```java
package 领扣.探索.数组;

import data_structure.array.Array;

import java.util.*;

public class 俩个数组的交集II {
    public static void main(String[] args) {
        int[] array1 = new int[]{1,2,2,1};
        int[] array2 = new int[]{2,2};

        System.out.println(Arrays.toString(fun(array1,array2)));
        System.out.println(Arrays.toString(fun1(array1,array2)));
    }

    //hash表的方法
    private static int[] fun(int[] nums1, int[] nums2) {
        Map<Integer,Integer> map = new HashMap<Integer, Integer>();
        //便利第一个数组 key---内容  value---出现的次数
        for (int i = 0; i < nums1.length; i++) {
            //存在的话
            if (map.containsKey(nums1[i])){
                //在原来的次数的基础上+1
                map.put(nums1[i],map.get(nums1[i])+1);
            }else {
                //不存在的话就是1
                map.put(nums1[i],1);
            }
        }
        //存放集合的链表
        List<Integer> array = new ArrayList<Integer>();
        //遍历第二个数组
        for (int i = 0; i < nums2.length; i++) {
            //如果存在的map中出现的次数-1，list中添加这个数
            if (map.get(nums2[i]) !=null && map.get(nums2[i]) > 0){
                array.add(nums2[i]);
                map.put(nums2[i],map.get(nums2[i])-1);
            }
        }
        //返回结果
        int[] a = new int[array.size()];
        for (int i = 0; i < array.size(); i++) {
            a[i] = array.get(i);
        }
        return a;
    }

    //双指针

    private static int[] fun1(int[] nums1, int[] nums2) {
        List<Integer> list = new ArrayList<Integer>();
        Arrays.sort(nums1);
        Arrays.sort(nums2);
        int index1 = 0;
        int index2 = 0;

        while (true){
            if (index1 == nums1.length || index2 == nums2.length)
                break;
            if (nums1[index1] < nums2[index2])
                index1++;
            else if (nums1[index1] == nums2[index2]){
                list.add(nums1[index1]);
                index1++;
                index2++;
            }else
                index2++;
        }
        //返回结果
        int[] a = new int[list.size()];
        for (int i = 0; i < list.size(); i++) {
            a[i] = list.get(i);
        }
        return a;
    }

}

```

