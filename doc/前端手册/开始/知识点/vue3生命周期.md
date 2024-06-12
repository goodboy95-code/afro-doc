---
outline: deep
---

# 生命周期

## vue3生命周期

setup:进行一些数据初始化

onMounted()：注册一个回调函数，在组件挂载完成后执行。

组件在以下情况下被视为已挂载：

- 其所有同步子组件都已经被挂载 。
- 其自身的 DOM 树已经创建完成并插入了父容器中。注意仅当根容器在文档中时，才可以保证组件 DOM 树也在文档中。

onUnmount():注册一个回调函数，在组件实例被卸载之后调用。

一个组件在以下情况下被视为已卸载：
- 其所有子组件都已经被卸载。
- 所有相关的响应式作用 (渲染作用以及 `setup()` 时创建的计算属性和侦听器) 都已经停止。

可以在这个钩子中手动清理一些副作用，例如计时器、DOM 事件监听器或者与服务器的连接。

先父后子：

挂载时：
* 父onBeforeMount
* onBeforeMount
* onMounted
* 父onMounted

卸载时：
* 父onBeforeUpdate
* onBeforeUnmount
* 父onUpdated
* onUnmounted