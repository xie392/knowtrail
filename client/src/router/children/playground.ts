export default [
    {
        path: '/playground',
        name: 'playground',
        component: () => import('@/views/playground/index.vue'),
        redirect: '/playground/notes',
        children: [
            {
                path: 'notes',
                name: 'notes',
                component: () => import('@/views/playground/notes/index.vue'),
                meta: {
                    title: '笔记',
                    auth: false
                }
            },
            {
                path: 'books',
                name: 'books',
                component: () => import('@/views/playground/books/index.vue'),
                meta: {
                    title: '知识库',
                    auth: false
                }
            },
            {
                path: 'read/:id',
                name: 'read',
                component: () => import('@/views/playground/read/index.vue'),
                meta: {
                    auth: false
                }
            }
        ],
        meta: {
            auth: false
        }
    },
    {
        path: '/search',
        name: 'search',
        component: () => import('@/views/playground/search/index.vue'),
        meta: {
            auth: false,
            layout: true
        }
    }
]
