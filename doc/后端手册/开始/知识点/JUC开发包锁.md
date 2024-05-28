---
outline: deep
---

# JUC开发包锁

## JUC锁框架

synchronized同步锁使用不便之处：

1. 释放锁不灵活，除了代码执行结束或异常，就只有wait或join，不能方便地中断一个线程对锁的占有。
2. 不支持读读共享+读写互斥+写写互斥这种更灵活的同步机制。
3. 不能控制获取锁失败的处理。

### 锁的分类

- 可重入锁与非可重入锁：
  之前介绍synchronized实现机制时提到过可重入的特性，就是同一个线程再次进入同一个锁的同步代码时，可以使用自己之前已获取到的锁。满足这样特性的锁就是可重入锁，与之相反则是非可重入锁。Java的synchronized锁，以及后面要介绍的ReentrantLock和ReentrantReadWriteLock都是可重入锁；而StampedLock则是不可重入锁。
- 公平锁与非公平锁：
  这里的公平，指的是“先来后到”，也就是FIFO，就是说，先请求锁的线程会先获得锁，这就是公平锁。后请求的线程有可能先获得锁的话，就是非公平锁。synchronized就是非公平的锁，而后面介绍的ReentrantLock和ReentrantReadWriteLock既支持公平锁也支持非公平锁。
- 读写锁和排他锁：
  如果一把锁在同一时刻只允许一个线程访问，不管这个线程是读还是写，那么它就是排它锁；而读写锁则允许多个线程同时读，只是不允许读写或者写写同时访问。synchronized和ReentrantLock都是排他锁，ReentrantReadWriteLock和StampedLock则是读写锁。

#### ReentrantLock

ReentrantLock有两个构造方法：

- ReentrantLock()：无参构造方法，默认非公平策略。
- ReentrantLock(boolean fair)：通过传入的布尔值fair确定使用公平非公平策略，true使用公平策略，false使用非公平策略。

ReentrantLock的使用很简单，lock + unlock即可，如下所示：

```java
class Counter implements Runnable {
    private final Lock lock = new ReentrantLock();
    private int count;

    @Override
    public void run() {
        for (int i = 0; i < 1000; i++) {
            increase();
        }
    }

    public void printCount() {
        System.out.println(count);
    }

    private void increase() {
        lock.lock();
        try {
            count++;
        } finally {
            lock.unlock();
        }
    }
}
class Test{
    public static void main(String[] args) {

        Counter counter = new Counter();

        ExecutorService executorService = Executors.newFixedThreadPool(50);
        List<Future> futures = new ArrayList<>();
        for (int i = 0; i < 50; i++) {
            futures.add(executorService.submit(counter));
        }
        executorService.shutdown();
        futures.forEach(future -> {
            try {
                future.get();
            } catch (InterruptedException | ExecutionException e) {
                e.printStackTrace();
            }
        });

        counter.printCount();
    }
}
```

::: tip

1. 一定要注意在finally里写unlock！以确保lock范围内代码发生异常时能够解锁。
2. lock不要写在try里，否则如果lock时发生异常，将进入finally执行unlock，但锁并未成功获取，会抛出IllegalMonitorStateException异常。
   :::

##### ReentrantLock的优势

ReentrantLock与synchronized相比，优势在于：

**1. ReentrantLock支持公平锁。
比如刚刚的代码，如果在构造ReentrantLock，传入参数true，new ReentrantLock(true)，那么就使用公平锁策略。**

**2. ReentrantLock能够配合Condition实现比synchronized + wait/notify机制更加灵活的线程间同步机制。**

- Condition是个接口，基本的方法就是await和signal/signalAll方法，分别对应wait和notify/notifyAll。
- Condition依赖于Lock接口，生成一个Condition对象的方法就是lock.newCondition()这么简单，一个Condition对象应该对应一个或一
- await和signal/signalAll方法必须位于lock与unlock之间。

```java
public class WorkFlow {

    private int step = 1;
    private final ReentrantLock lock = new ReentrantLock();

    // Condition用于控制线程是否释放锁以及被唤醒
    // condition1用于控制刘备线程
    private final Condition condition1 = lock.newCondition();
    // condition2用于控制关羽线程
    private final Condition condition2 = lock.newCondition();
    // condition3用于控制张飞线程
    private final Condition condition3 = lock.newCondition();

    // 刘备线程遍历执行doStep1
    public void doStep1() {
        lock.lock();
        try {
            while (step != 1) {
                // 当前线程在 condition1 上等待
                condition1.await();
            }
            System.out.printf("%s 把军师的信递给了二弟 ...%n", Thread.currentThread().getName());
            step = 2;
            // 唤醒所有在 condition2 上等待的线程
            condition2.signalAll();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            lock.unlock();
        }
    }

    // 关羽线程遍历执行doStep2
    public void doStep2() {
        lock.lock();
        try {
            while (step != 2) {
                // 当前线程在 condition2 上等待
                condition2.await();
            }
            System.out.printf("%s 把军师的信递给了三弟 ...%n", Thread.currentThread().getName());
            step = 3;
            // 唤醒所有在 condition3 上等待的线程
            condition3.signalAll();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            lock.unlock();
        }
    }

    // 张飞线程遍历执行doStep3
    public void doStep3() {
        lock.lock();
        try {
            while (step != 3) {
                // 当前线程在 condition3 上等待
                condition3.await();
            }
            System.out.printf("%s 把军师的信递给了大哥 ...%n", Thread.currentThread().getName());
            step = 1;
            // 唤醒所有在 condition1 上等待的线程
            condition1.signalAll();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            lock.unlock();
        }
    }
}

class Test1 {

    public static void main(String[] args) {

        WorkFlow workFlow = new WorkFlow();

        // 启动刘备线程
        new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                workFlow.doStep1();
            }
        }, "刘备").start();
        // 启动关羽线程
        new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                workFlow.doStep2();
            }
        }, "关羽").start();
        // 启动张飞线程
        new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                workFlow.doStep3();
            }
        }, "张飞").start();
    }
}
```

**3. ReentrantLock提供了更灵活的获取锁的方法，有效避免了死锁的发生，包括tryLock和lockInterruptibly。**

