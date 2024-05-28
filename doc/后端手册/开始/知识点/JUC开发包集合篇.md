---
outline: deep
---

# JUC开发包集合篇

## JUC集合框架

Java已经在java.util包下提供了一些集合类，大部分是不考虑线程安全的，比如HashMap之类，它们主要用于单线程开发环境。

### ConcurrentHashMap

HashMap线程不安全，ConcurrentHashMap线程安全，在并发环境下，建议大家使用JUC提供的ConcurrentHashMap。

这里谈论HashMap线程不安全，或者ConcurrentHashMap线程安全时，指的只是单个操作(比如put)的线程安全，而不是组合操作(
先get再put之类)的线程安全。

#### HashMap线程不安全的原因

为什么说HashMap是线程不安全的？主要是因为在高并发环境下，多个线程同时对一个HashMap对象进行单个put操作时，可能会发生以下现象：

- 多线程同时put可能导致部分线程put的元素丢失

> 如果两个不同的线程同时对一个HashMap执行put操作，就有可能同时有两个key需要挂到一个地址上。
> 假如此时该地址尚未保存任何元素，而且好巧不巧两个线程同时执行了判断该位置是否已经有Node存在的判断，那么两个线程都认为该位置还没有Node。
> 于是，各自创建了Node元素往该地址上挂，导致先挂上的Node被后挂上的Node覆盖掉了。于是就会丢失其中一个线程put进来的元素。

- 多线程put与get并发可能导致get结果为null

> 一个线程执行put，可能会由于元素个数超出阈值而导致hashmap执行扩容resize，那么在扩容过程中，如果在"
> 新的hash表创建出来，但尚未将旧的hash表元素迁移或完全迁移到新的hash表"时，恰巧另一个线程执行get，那么它就拿不到目标元素，只能返回null。

#### ConcurrentHashMap线程安全机制

JDK8以后使用CAS和synchronized：

* 仍然使用volatile保证操作hash表的Node集合时的有序性和可见性；
* 使用hash表每个Node集合的头结点作为synchronized锁，来保证put操作的线程安全；
* 当hash表的某个位置的Node集合是null时，使用CAS操作保证数据写入的线程安全。

ConcurrentHashMap的使用

ConcurrentHashMap实现了ConcurrentMap接口，在Map接口的基础上，增加了4个方法：

- V putIfAbsent(K key, V value) : 只在key不存在时才写入；如果Map中已经存在该key，则不替换原有的value值。
- boolean remove(Object key, Object value) : 只有要删除的key-value能与Map中既有的key-value分别对应上时，才会删除该元素。
- boolean replace(K key, V oldValue, V newValue) : 只有要替换的key-value能与Map中既有的key-value分别对应上时，才会替换value。
- V replace(K key, V value) : 只要key存在就直接替换value。

### BlockingQueue

阻塞队列BlockingQueue是一个队列接口，一般用于生产者-消费者模式，生产者是往队列里添加元素的线程，消费者是从队列里拿元素的线程。


## CopyOnWriteArrayList

JUC提供了两个CopyOnWrite集合：CopyOnWriteArrayList和CopyOnWriteArraySet。

CopyOnWrite集合就是在写的时候复制一份的集合副本，当某个线程往这个集合添加或删除元素的时候，并不是直接修改原来的集合，而是往复制出来的副本中添加或删除，修改之后再将原来集合的引用全部更新为集合副本的地址。

这种机制的优势在于，并发场景下读操作不用加锁，实现了读写分离，大大提升了的读的性能表现，常用于读多写少的场景。
此外，对于Java而言，一般的集合在遍历过程中不能有其他线程增删集合元素，否则会抛出ConcurrentModificationException并发修改异常。使用CopyOnWrite的集合则可以回避这个异常。

如果集合件数较多，遍历时间较长，那么在此期间增添或者删除的元素，是不能在本次遍历中体现出来的，数据上有一定的延迟性。
对于一些耗时较长的遍历，或者数据实时性要求较高的场景，这在业务上可能是不能接受的。就是说，CopyOnWrite只保证数据最终一致性，不保证数据的强一致性。