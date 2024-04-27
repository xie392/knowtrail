import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/home/index.vue'
import playground from './children/playground'
import workspace from './children/workspace'
import settings from './children/settings'
import knowledge from './children/knowledge'
import { useLoading } from '@/hooks/useLoading'

/**
 * 白名单路由
 */
export const baseRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        alias: '/about',
        name: 'home',
        component: HomeView,
        meta: {
            title: '首页',
            auth: false,
            layout: true
        }
    },
    {
        path: '/user/:id',
        name: 'user',
        component: () => import('@/views/user/index.vue'),
        meta: {
            layout: true,
            keepAlive: false,
            auth: false
        }
    },
    {
        path: '/doc/:pid/:id',
        name: 'doc',
        component: () => import('@/views/doc/index.vue'),
        meta: {
            title: '文档',
            layout: true,
            keepAlive: false,
            auth: false
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/auth/login/index.vue'),
        meta: {
            keepAlive: false,
            layout: false,
            title: '登录',
            auth: false
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/auth/register/index.vue'),
        meta: {
            keepAlive: false,
            layout: false,
            title: '注册',
            auth: false
        }
    },
    {
        path: '/forget',
        name: 'forget',
        component: () => import('@/views/auth/forget/index.vue'),
        meta: {
            keepAlive: false,
            layout: false,
            title: '重置密码',
            auth: false
        }
    },
    {
        path: '/error',
        name: 'error',
        component: () => import('@/views/error/error.vue'),
        meta: {
            keepAlive: false,
            title: '错误',
            layout: false,
            auth: false
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('@/views/error/404.vue'),
        meta: {
            keepAlive: false,
            title: '404',
            layout: false,
            auth: false
        }
    }
]

const routes: RouteRecordRaw[] = [...baseRoutes, ...playground, ...workspace, ...settings, ...knowledge]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(_to, _from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})

router.beforeEach((to, _from, next) => {
    useLoading(true)
    if (to.meta.title) {
        document.title = to.meta.title as string
    }
    next()
})

router.afterEach(() => {
    // 关闭loading动画
    useLoading(false)
})

export default router
