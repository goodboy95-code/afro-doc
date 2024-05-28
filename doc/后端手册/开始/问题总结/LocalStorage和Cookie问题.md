---
outline: deep
---

# LocalStorage和Cookie问题

## 1. LocalStorage
可以存储更大量的数据（一般5MB左右）。
数据存储在客户端，不会随着每次HTTP请求被发送到服务器。
操作简单，只需使用setItem和getItem方法即可。

## 2. Cookie
存储量较小，一般只有4KB左右。
每次HTTP请求都会携带Cookie，增加网络流量。