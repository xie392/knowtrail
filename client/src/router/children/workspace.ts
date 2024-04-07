export default [
    {
        path: '/workspace',
        name: 'workspace',
        component: () => import('@/views/workspace/index.vue'),
        redirect: '/workspace/dashboard',
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                component: () => import('@/views/workspace/dashboard/index.vue'),
                meta: {
                    title: '开始'
                }
            },
            {
                path: 'collections',
                name: 'collections',
                component: () => import('@/views/workspace/collections/index.vue'),
                meta: {
                    title: '收藏'
                }
            },
            {
                path: 'focus',
                name: 'focus',
                component: () => import('@/views/workspace/focus/index.vue'),
                meta: {
                    title: '关注'
                }
            },
            {
                path: 'message',
                name: 'message',
                component: () => import('@/views/workspace/message/index.vue'),
                meta: {
                    title: '消息'
                }
            },
            {
                path: 'templates',
                name: 'templates',
                component: () => import('@/views/workspace/templates/index.vue'),
                meta: {
                    title: '模板'
                }
            },
            {
                path: 'knowledge',
                name: 'knowledge',
                component: () => import('@/views/workspace/knowledge/index.vue'),
                meta: {
                    title: '知识库'
                }
            }
        ],
        meta: {
            layout: false,
            transition: 'none'
        }
    }
]
