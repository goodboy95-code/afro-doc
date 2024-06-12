---
outline: deep
---

# Java知识点

## 1. java反射

允许程序在运行时获取和操作类、方法、字段等元素的信息。

在运行时构造一个类的对象。

```java
Class<Person> personClass = Person.class;
Object obj = clazz.getDeclaredConstructor().newInstance();
```

判断一个类所具有的成员变量和方法。

```java
//Field[] getDeclaredFields()：获取所有的成员变量，不考虑修饰符
Field[] declaredFields = personClass.getDeclaredFields();
//1.Field[] getFields()获取所有public修饰的成员变量
Field[] fields = personClass.getFields();
//获取所有public修饰的方法
Method[] methods = personClass.getMethods();
//获取类名
String className = personClass.getName();
System.out.println(className);//com.demo.Person
```

## 动态代理

动态代理是运行时动态生成代理类，然后创建代理对象，代理对象执行方法时，会执行代理类中的方法，代理类中的方法会调用被代理对象的方法。

### JDK动态代理

下面是一个使用 JDK 动态代理的简单示例：

1. 定义一个接口和其实现类：

```java
public interface HelloService {
    void sayHello();
}

public class HelloServiceImpl implements HelloService {
    @Override
    public void sayHello() {
        System.out.println("Hello, World!");
    }
}
```

2. 创建一个动态代理处理器：

```java
public class DynamicProxyHandler implements InvocationHandler {
    private Object target;
    public DynamicProxyHandler(Object target) {
        this.target = target;
    }
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("before method");
        Object result = method.invoke(target, args);
        System.out.println("after method");
        return result;
    }
}
```

3. 使用 Proxy 类创建代理对象：

```java
 HelloService helloService = new HelloServiceImpl();
        HelloService proxyInstance = (HelloService) Proxy.newProxyInstance(
                helloService.getClass().getClassLoader(),
                helloService.getClass().getInterfaces(),
                new HelloServiceInvocationHandler(helloService)
        );
 proxyInstance.sayHello("java");
```

