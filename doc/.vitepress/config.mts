import {defineConfig} from 'vitepress'

export default defineConfig({
    title: "首页",
    titleTemplate: "Afro后台系统",
    description: "后台系统中文文档",
    base: "/afro-doc",
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
                text: '项目部署',
                link: '/项目部署/项目部署'
            },
            {
                text: '资源下载',
                link: '/项目部署/资源下载'
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
                                    {text: '响应式', link: '/前端手册/开始/正文/响应式'},
                                    {text: '注册功能', link: '/前端手册/开始/正文/注册功能'},
                                    {text: '登录功能', link: '/前端手册/开始/正文/登录功能'},
                                ]
                            },
                            {
                                text: '知识点',
                                items: [
                                    {text: 'vue3生命周期', link: '/前端手册/开始/知识点/vue3生命周期'},
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
                                    {text: 'Java数据类型', link: '/后端手册/开始/知识点/Java数据类型'},
                                    {text: 'redis数据类型', link: '/后端手册/开始/知识点/redis数据类型'},
                                    {text: 'redis知识点', link: '/后端手册/开始/知识点/redis知识点'},
                                    {text: 'mysql知识点', link: '/后端手册/开始/知识点/mysql知识点'},
                                    {text: '索引优化案例', link: '/后端手册/开始/知识点/索引优化案例'},
                                    {text: '工具类使用', link: '/后端手册/开始/知识点/工具类使用'},
                                    {text: '多线程知识点基础篇', link: '/后端手册/开始/知识点/多线程知识点基础篇'},
                                    {
                                        text: '多线程知识点线程安全篇',
                                        link: '/后端手册/开始/知识点/多线程知识点线程安全篇'
                                    },
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
        footer: {
            copyright: 'Copyright © 2024-present 薛业威',
            message: 'Released under the MIT License.   <a href="https://beian.miit.gov.cn/" target="_blank">皖ICP备2024051109号-1</a>',

        }
    },
    head: [
        ['link', {rel: 'stylesheet', href: '/theme/index.css'}]
    ]
})
