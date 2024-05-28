---
outline: deep
---

# redis数据类型

## String类型

string 是 redis 最基本的类型，string 类型的值最大能存储 512MB。

## Hash类型（数据结构 哈希表）

Hash类型，也叫散列，其中value是一个无序字典，类似于Java中的HashMap结构

## List类型（数据结构 双向链表）

Redis中的List类型与Java中的LinkedList类似，可以看做是一个双向链表结构。既可以支持正向检索和也可以支持反向检索。
特征：

1. 有序
2. 元素可以重复
3. 插入和删除快
4. 查询速度一般

## Set类型（数据结构 哈希表）

Redis的Set结构与Java中的HashSet类似，可以看做是一个value为null的HashMap。
特征：

1. 无序
2. 元素不可重复
3. 查找快

## SortedSet（数据结构 跳跃表和哈希表）

Redis的SortedSet是一个可排序的set集合。SortedSet中的每一个元素都带有一个score属性，可以基于score属性对元素排序，底层的实现是一个跳表（SkipList）加 hash表。

SortedSet具备下列特性：

1. 可排序
2. 元素不重复
3. 查询速度快


