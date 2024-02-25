export default [
    {
        path: '/settings',
        name: 'settings',
        component: () => import('@/views/settings/index.vue'),
        redirect: '/settings/profile',
        children: [
            {
                path: 'profile',
                name: 'profile',
                component: () => import('@/views/settings/profile/index.vue'),
                meta: {
                    title: '个人资料'
                }
            },
            {
                path: 'notifications',
                name: 'notifications',
                component: () => import('@/views/settings/notifications/index.vue'),
                meta: {
                    title: '消息设置'
                }
            },
            {
                path: 'safety',
                name: 'safety',
                component: () => import('@/views/settings/safety/index.vue'),
                meta: {
                    title: '安全设置'
                }
            },
            {
                path: 'account',
                name: 'account',
                component: () => import('@/views/settings/account/index.vue'),
                meta: {
                    title: '账号设置'
                }
            },
            {
                path: 'stats',
                name: 'stats',
                component: () => import('@/views/settings/stats/index.vue'),
                meta: {
                    title: '数据统计'
                }
            }
            // TODO: add more
        ],
        meta: {
            layout: false
        }
    }
]
