import {defineConfig} from 'vitepress'

export default defineConfig({
  title: "首页",
  titleTemplate: "Afro后台系统",
  description: "后台系统中文文档",
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    siteTitle: 'Afro后台系统',
    outline: {label: "当前页大纲"},
    nav: [
      {text: '首页', link: '/'},
      {text: '开发手册', link: '/前端手册/项目介绍'}
    ],
    sidebar: [
      {
        text:'项目部署',
        link: '/项目部署/项目部署'
      },
      {
        text: '前端手册',
        items: [
          {text: '项目介绍', link: '/前端手册/项目介绍'},
          {
            text: '开始',
            link: '/前端手册/开始',
            items: [
              {
                text: '正文',
                items: [
                  {text: '主题功能', link: '/前端手册/开始/正文/主题功能'},
                ]
              },
              {
                text: '问题总结',
                items: [
                  {text: '路由问题', link: '/前端手册/开始/问题总结/路由问题'},
                  {text: '浮动问题', link: '/前端手册/开始/问题总结/浮动问题'},
                  {text: 'useRoute()问题', link: '/前端手册/开始/问题总结/useRoute()问题'},
                ]
              }
            ]
          },
        ]
      },
      {
        text: '后端手册',
        items: [
          {text: '项目介绍', link: '/后端手册/项目介绍'},
          {
            text: '开始',
            link: '/后端手册/开始',
            items: [
              {
                text: '正文',
                items: [
                  {text: '登录功能', link: '/后端手册/开始/正文/登录功能'},
                  {text: '注册功能', link: '/后端手册/开始/正文/注册功能'},
                  {text: '权限功能', link: '/后端手册/开始/正文/权限功能'},
                  {text: '日志功能', link: '/后端手册/开始/正文/日志功能'},
                  {text: '在线用户功能', link: '/后端手册/开始/正文/在线用户功能'},
                  {text: '限流功能', link: '/后端手册/开始/正文/限流功能'},

                ]
              },
              {
                text: '知识点',
                items: [
                  {text: '数据结构', link: '/后端手册/开始/知识点/数据结构'},
                  {text: 'java数据类型', link: '/后端手册/开始/知识点/java数据类型'},
                  {text: 'redis数据类型', link: '/后端手册/开始/知识点/redis数据类型'},
                  {text: 'redis知识点', link: '/后端手册/开始/知识点/redis知识点'},
                  {text: 'mysql知识点', link: '/后端手册/开始/知识点/mysql知识点'},
                  {text: '索引优化案例', link: '/后端手册/开始/知识点/索引优化案例'},
                  {text: '工具类使用', link: '/后端手册/开始/知识点/工具类使用'},
                  {text: '多线程知识点基础篇', link: '/后端手册/开始/知识点/多线程知识点基础篇'},
                  {text: '多线程知识点线程安全篇', link: '/后端手册/开始/知识点/多线程知识点线程安全篇'},
                  {text: 'JUC开发包锁', link: '/后端手册/开始/知识点/JUC开发包锁'},
                  {text: 'JUC开发包集合篇', link: '/后端手册/开始/知识点/JUC开发包集合篇'},
                  {text: 'JUC线程池', link: '/后端手册/开始/知识点/JUC线程池'},
                  {text: '并发其他知识点', link: '/后端手册/开始/知识点/并发其他知识点'},
                ]
              },
              {
                text: '问题总结',
                items: [
                  {text: 'redis序列化问题', link: '/后端手册/开始/问题总结/redis序列化问题'},
                  {text: 'PageImpl序列化问题', link: '/后端手册/开始/问题总结/PageImpl序列化问题'},
                  {text: '循环依赖问题', link: '/后端手册/开始/问题总结/循环依赖问题'},
                  {text: '事务问题', link: '/后端手册/开始/问题总结/事务问题'},
                  {text: '多线程问题', link: '/后端手册/开始/问题总结/多线程问题'},
                ]
              }
            ]
          },
        ]
      }
    ],

    socialLinks: [
      {
        icon: {svg: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1699613301412" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1444" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M512 1024C229.222 1024 0 794.778 0 512S229.222 0 512 0s512 229.222 512 512-229.222 512-512 512z m259.149-568.883h-290.74a25.293 25.293 0 0 0-25.292 25.293l-0.026 63.206c0 13.952 11.315 25.293 25.267 25.293h177.024c13.978 0 25.293 11.315 25.293 25.267v12.646a75.853 75.853 0 0 1-75.853 75.853h-240.23a25.293 25.293 0 0 1-25.267-25.293V417.203a75.853 75.853 0 0 1 75.827-75.853h353.946a25.293 25.293 0 0 0 25.267-25.292l0.077-63.207a25.293 25.293 0 0 0-25.268-25.293H417.152a189.62 189.62 0 0 0-189.62 189.645V771.15c0 13.977 11.316 25.293 25.294 25.293h372.94a170.65 170.65 0 0 0 170.65-170.65V480.384a25.293 25.293 0 0 0-25.293-25.267z" fill="#2c2c2c" p-id="1445"></path></svg>'},
        link: 'https://gitee.com/xueyewei/edu',
        ariaLabel: 'gitee'
      }
    ]
  },
  head: [
    ['link', { rel: 'stylesheet', href: '/theme/index.css' }]
  ]
})
