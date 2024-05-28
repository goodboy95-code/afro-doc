---
outline: deep
---

# JUC线程池

## 为什么要使用线程池

- 线程池可以复用线程，避免过多地创建/销毁线程，提高每次任务执行的响应速度(复用线程时不用再创建线程了)，从而降低系统的整体性能损耗。毕竟Java的线程模型是内核线程模型，每个JVM层面的线程都对应着一个系统内核线程，因此它的创建/销毁还是很耗费系统资源的，能省则省。
- 线程池可以有效控制并发数量，这其实才是线程池最大的用处。你没有看错，线程池最大的作用就是控制并发数量。菜鸟们总是觉得线程越多，性能应该越好，现在大家应该知道并非如此。线程太多不但有内存上的压力，更主要的是会让CPU在线程切换上浪费大量资源。而线程池最主要的作用就是控制线程数量，也就是控制并发数量。
- 线程池可以对线程进行统一管理，包括分配、调优以及监控等等，屏蔽了管理单个线程生命周期的操作复杂性。
- 线程池具备可扩展性，允许开发者增加额外的功能，比如可以用来做计划任务的ScheduledThreadExecutor。

## ThreadPoolExecutor线程池

ThreadPoolExecutor一方面维护自身生命周期，另一方面管理线程和任务，让池中的线程并发地执行提交进来的任务。

### 实现原理

ThreadPoolExecutor内部有两个核心存储机制：workers线程集合(Thread Pool)和workQueue任务队列(阻塞队列)。
线程池实现时要解决的核心问题就是用多少线程去并发执行多少任务，因此ThreadPoolExecutor首先做的是将线程和任务解耦，分开管理。

- 线程池Thread Pool：ThreadPoolExecutor提供了一个内部类Worker，它实现了Runnable接口，被当做工作线程。
同时有一个`HashSet<Worker>`类型的workers集合用来当做线程池Thread Pool。
线程池被划分为两部分，一部分是核心线程池core pool，可以复用的线程被放在这里，它有一个属性corePoolSize，用来指定核心池的线程数上限；
核心线程池以外的部分用来存放临时线程，通过maximumPoolSize指定整个线程池的线程数上限。
- 任务队列workQueue：ThreadPoolExecutor提供了一个`BlockingQueue<Runnable>`类型的workQueue任务队列，用于缓存提交到线程池的任务。

**步骤**

Step1：任务被提交后，线程池先判断当前核心池是否已满。
没有满的话，就直接申请创建一个worker线程放入核心池，并立即执行提交的任务。
Woker内部有个Runnable firstTask用于接收这种直接执行的任务，并在自己的run方法里优先执行firstTask。
如果核心池已满，则进入下一步。
Step2：核心池已满时，判断任务队列是否已满。
未满则将任务加入任务队列，之前在Step1中被创建出来的核心工作线程会在执行完自己的firstTask之后尝试从任务队列获取任务来执行。
任务队列已满的话，进入下一步。
Step3：任务队列已满时，判断整个线程池是否已满。
未满则创建一个worker线程作为非核心线程加入线程池，并直接执行提交的任务，与核心工作线程一样，firstTask执行结束后，非核心工作线程也会尝试从任务队列拉取任务执行，但不同的是，如果在限时内没有拉取到任务，该非核心工作线程会被回收；
整个线程池已满的话，则进入下一步。
Step4：根据线程池创建时指定的RejectedExecutionHandler拒绝处理策略，拒绝提交的任务。

![](/image/JUC线程池1-1.jpg)

### ThreadPoolExecutor参数配置

- int corePoolSize：核心池最大线程数。如前所述，线程池中的线程有"正式员工"和"临时工"的区别。核心池中的工作线程是正式员工，任务队列即使空了，这些没事干的核心线程也不会被回收；非核心工作线程作为临时工就比较惨了，如果在超时前不能从任务队列拉取的任务，那就会被回收掉。
- int maximumPoolSize：整个线程池中的最大线程数。虽然有临时工编制，但正式员工和临时工加起来也不能超过这个上限。
- long keepAliveTime：非核心线程闲置时间上限。如果临时工超过这个时间都没能从任务队列拉取到任务，就会被回收。
- TimeUnit unit：keepAliveTime的时间单位。
- `BlockingQueue<Runnable>` workQueue：任务队列，通过传入的阻塞队列缓存等待执行的任务。
- ThreadFactory threadFactory：用于创建工作线程的工厂。不传该参数时，默认使用DefaultThreadFactory，默认线程工厂采用的线程创建策略是不设置守护线程，优先级设置为默认级别 NORM_PRIORITY，线程组优先使用SecurityManager安全管理器的线程组(一般是main)，JVM没有启动安全管理器时使用当前线程的线程组。
- SecurityManager安全管理器是Java的一个工具类，用于检查运行代码的权限，防止一些恶意代码对系统产生不好的影响。安全管理器可以通过JVM参数-Djava.security.manager启动，一般不启动。

```java
private void testThreadPoolExecutorByFuture() {
    List<Future<Integer>> futures = new ArrayList<>();
    ExecutorService executorService = new ThreadPoolExecutor(5, 10, 60, TimeUnit.SECONDS, new LinkedBlockingQueue<>());
    for (int i = 0; i < 100; i++) {
        // 一般使用submit一个一个异步提交任务而不使用invokeAll一把提交所有任务，因为invokeAll会阻塞当前线程直到所有线程都执行结束。
        Future<Integer> future = executorService.submit(new RandomIntInTen());
        futures.add(future);
    }
    executorService.shutdown();
    try {
        // 一般采用遍历Future集合一个一个get的方式等待所有线程执行结束并获得执行结果
        for (Future<Integer> future : futures) {
            Integer number = future.get();
            System.out.println(number);
        }
    } catch (InterruptedException | ExecutionException e) {
        e.printStackTrace();
    }
}
```


### ThreadPoolExecutor拒绝处理策略
1. RejectedExecutionHandler handler：拒绝处理策略，当线程池已满时会采取这个策略对提交的任务进行残忍的拒绝。有四种拒绝策略：
2. ThreadPoolExecutor.AbortPolicy：默认拒绝策略，丢弃新提交的任务并抛出RejectedExecutionException异常。
3. ThreadPoolExecutor.DiscardPolicy：丢弃新提交的的任务，但是不抛出异常。
4. ThreadPoolExecutor.DiscardOldestPolicy：丢弃任务队列头部任务(最老的)，然后重新尝试执行execute，如果再次失败，重复此过程。
5. ThreadPoolExecutor.CallerRunsPolicy：由调用方线程，即提交任务的线程处理该任务。

### 线程数量设置

- CPU密集型任务：CPU核数 × 2 + IO设备数，比如8核CPU读写一块磁盘，那线程池的建议值就是8 × 2 + 1 = 17

最大线程数的设置需要根据具体的应用场景和系统资源来决定。没有固定的规则适用于所有情况，需要通过实验和监控来确定最佳的配置。