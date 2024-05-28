---
outline: deep
---

# useRoute()问题

`watchEffect` 是 Vue 3 的一个新特性，它用于跟踪响应式依赖项的变化。
`useRoute()`，这是 Vue Router 的一个 Composition API 函数。
`useRoute()` 和其他 `Composition API` 函数只能在 `setup` 函数或其他 `Composition API` 函数中使用。
它们不能在 watchEffect 或 watch 的回调函数中使用，因为这些回调函数不是组件的生命周期的一部分。

## 案例(正确)

```typescript
const route = useRoute()
watchEffect(() => {
    breadcrumbData.pathMatched = route.matched.filter((data) => {
        return !data.meta.hidden
    })
})

watch(route, (route) => {
    breadcrumbData.pathMatched = route.matched.filter((data) => {
        return !data.meta.hidden
    })
})
```

## 案例(错误)

```typescript
watchEffect(() => {
    breadcrumbData.pathMatched = useRoute().matched.filter((data) => {
        return !data.meta.hidden
    })
})

watch(useRoute(), (route) => {
    breadcrumbData.pathMatched = route.matched.filter((data) => {
        return !data.meta.hidden
    })
})
```
