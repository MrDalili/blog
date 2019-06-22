---
title: 实现一个简单和HashMap
date: 2019-06-21 09:36:00
tags:
- 数据结构
- Java
categories:
- [Java,数据结构]
---

面试，最不能落下的就是算法和数据结构，这周重心都放在了JVM上，所以算法看了个题目到现在都没打，在这篇博客之后，那就把这周欠的算法题都补上，发出来。  

<!--more-->

数据结构，在面试中问的最多的应该就是树和字典，链表这种比较简单，HashMap这个东西就比较难，因为在Java8以后，它把hash冲突的解决方法在拉链法的基础上增加了红黑树，都还没听说过呢，哥哥，埋了个坑，什么b+数，红黑树等等，一个一个给他手撕出来，吓死面试官，哈哈哈哈。  

## 做好写HashMap的准备

1. 打开编译器——IDEA
2. 打开以前专门为去蓝桥杯所创建的算法project
3. 看一下买的课程，跟着老师去学HashMap
4. 看完视频，理解了核心思想，开始盘它

## 先写一个接口IMap

这个接口就跟JDK中的Map接口一样，先给它盘一个这个么个接口  

```java
/***
 * 一个自己实现的map的接口
 * @param <K> 键
 * @param <V> 值
 */
public interface IMap<K,V> {
    void clear();//清楚所有键值对
    boolean containsKey(Object key);//查询是否包含一个键
    boolean containsValue(Object value);//查询是否包含一个值
    V get(Object key);//通过键获取到对应的值
    boolean isEmpty();//判断IMap是否为空
    K[] keySet();//获得所有键的集合
    void put(K key , V value);//存放一个键值对
    void putAll(IMap<? extends K , ? extends  V> map);//将另外一个IMap中的所有键值对，存放到本IMap种
    V remove(Object key);//通过键删除一个键值对，并返回值
    int size();//IMap的大小
    V[] values();//所有值的数组
    int hash(Object key);//计算hash值
}

```

这里面定义了一般Map都得有的接口，我都标明了注释。  

## 实现HashMap

根据我自己定义的IMap实现一个MyHashMap，但是在实现之前，我们要明白这么几个东西：

+ hash函数

  hash函数是个好东西，它可以将俩个长得差不多的东西通过hash给它整的“八竿子打不着一瞥”，就是这样，我们就需要这么一个hash函数，要不然hash太垃圾，我存2个键值对  

  > "1"->one  
  >
  > "11"->eleven  

  通过hash放在了一个索引下，那不是大大的偏离我们的hash初衷，所以我就去查了一下JDK中HashMap中的hash函数，我自己实现了一下  

  ```java
  /**
       * 计算hash值
       * 将key的hashcode向右移动16位，在与原先的hashcode做异或
       */
      @Override
      public int hash(Object key) {
          int h ;
          return key == null ? 0 : ((h = key.hashCode()) ^ (h>>16)) & length-1;
      }
  ```

  **原理就是**：将一个不为空的object通过hashcode后，将其向右偏移16位，在于它本身的hashcode做异或运算，之后再与上字典中装键值对数组的长度-1。

+ 发生了hash冲突我们该怎么办

  hash冲突就是，2个不一样数通过hash后，值相等了，市面上比较流行的解决hash冲突的有这些办法：

  + 拉链法

    JDK中将拉链法拓展了红黑树


+ 如何保存键值对

  我通过实现一个Node内部类数组来实现对键值对的保存

  ```java
      /**
       * 内部类，用来存放键值对的
       */
      private class Node<K,V>{
          K key;
          V value;
          Node next;//下一个节点
          public Node(K key, V value) {
              this.key = key;
              this.value = value;
          }
      }
  ```

在正式开写之前，我们也要考虑是否要增加一些变量，通过观察需要实现的方法，我定义了以下三个变量

```java
    private int length = 16;//类中存放键值对节点长度的数组
    private Node[] buckets = new Node[length];//相当于一个桶，存放hash后结果的链表头节点数组
    private int size = 0;//当前桶中有多少个元素	
```

接下来就开始实现各个方法

+ put方法

  put方法的重点就是，你hash后得到了在桶中的下标，你要判断这个key是否在这个下标所对应的链表中存在，存在的话要跟新，不存在的话，对于这个链表添加一个节点，实现过程如下:

  ```java
  //重点是有重复的怎么处理，做替换处理，更新操作
      @Override
      public void put(K key, V value) {
          Node<K,V> node = new Node<K, V>(key,value);
          //先hash一下
          int hashIndex = hash(key);
          //现在就去这个下标所对应的链表中去插入该键值对
          if (buckets[hashIndex] == null){
              buckets[hashIndex] = node;
              size++;
          }else {
              //这是hash冲突的情况了，要判断这个值是否出现，出现的话覆盖，没出现的话添加到最后面去
              Node<K,V> first = buckets[hashIndex];
              Object f = first.key;
              //判断一下是不是覆盖了
              while (first != null){
                  if (f == key && (key != null && key.equals(f))){
                      //出现了key相等的情况
                      //覆盖原来的value
                      first.value = value;
                      //直接跳出，因为只会有一个key
                      break;
                  }else {
                      if (first.next == null){
                          //这是最后一个元素
                          first.next = node;
                          size++;
                          break;
                      }
                  }
                  first = first.next;
              }
          }
      }
  
  ```

+ remove方法

  与put相对应，put是存，那我remove就是移除，将map中存在的key移除，实现如下

  ```java
  @Override
      public V remove(Object key) {
          int hashIndex = hash(key);
          Node first = buckets[hashIndex];
          Node pre = null;
          while (first != null){
              //第一次进入，pre还未初始化
              if (pre == null){
                  //先判断是不是相等
                  if (first.key == key || ((key != null) && key.equals(first.key))){
                      //判断是不是只有一个元素
                      if (first.next == null ) {
                          buckets[hashIndex] = null;
                          size--;
                          return (V)first.value;
                      }
                      else {
                          //有2个以上的元素
                          buckets[hashIndex] = first.next;
                          size--;
                          return (V)first.value;
                      }
                  }
                  pre = first;
                  first = first.next;
              }else{
                  //已经有前驱了
                  if (first.key == key || ((key != null) && key.equals(first.key))){
                      //如果相等那么久跳过中间的节点输出
                      pre.next = first.next;
                      size--;
                      return (V) first.value;
                  }
              }
          }
          return null;
      }
  ```

+ clear方法，用于清楚map中所有的键值对

  ```java
      @Override
      public void clear() {
          for (int i = 0; i < length; i++) {
              //遍历让每一个头指针位空
              buckets[i] = null;
          }
          //map清空，size应=0
          size = 0;
      }
  ```

+ containsKey方法，用于查看map中是否存在一个key

  ```java
      @Override
      public boolean containsKey(Object key) {
          //此处应该直接hash一下，然后判断一不一样，一样的话就有，不一样的话就没有
          int hIndex = hash(key);
          if (buckets[hIndex] != null){
              //有值，而且可能冲突，遍历一下都看看
              Node first = buckets[hIndex];
              while (first != null) {
                  if (first.key == key || ((key != null) && key.equals(first.key)))
                      return true;
                  first = first.next;
              }
          }
          return false;
      }
  ```

+ containsValue，看是不是存在一个value

  ```java
      //全遍历一遍
      @Override
      public boolean containsValue(Object value) {
          for (int i = 0; i < length; i++) {
              if (buckets[i] != null) {
                  Node first = buckets[i];
                  while (first != null){
                      if (first.value.equals(value))
                          return true;
                      first = first.next;
                  }
              }
          }
          return false;
      }
  ```

+ get方法，通过一个key，获取它的value

  ```java
      @Override
      public V get(Object key) {
          int hashIndex = hash(key);
          Node first = buckets[hashIndex];
          //判断一下是否为空
          if (first != null){
              while (first != null){
                  if (first.key == key && ((key != null) && key.equals(first.key)))
                      return (V)first.value;
                  first = first.next;
              }
          }
          return null;
      }
  
  ```

+ isEmpty，map是否为空

  ```java
      @Override
      public boolean isEmpty() {
          return size == 0;
      }
  ```

还有一些没有实现，后面会慢慢的补上，在后面会将红黑树放进来，我们给它手撕以下，加油学习，学到红黑树，哈哈哈哈。

