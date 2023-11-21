export default [
    {
        path: '/knowledge/:pid',
        name: 'knowledgeEditor',
        component: () => import('@/views/knowledge/index.vue'),
        children: [
            {
                path: ':id',
                name: 'editor',
                component: () => import('@/views/knowledge/page/index.vue')
            }
        ],
        meta: {
            layout: false
        }
    }
]
