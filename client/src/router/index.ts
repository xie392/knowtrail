import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/home/index.vue'
import playground from './children/playground'
import workspace from './children/workspace'
import settings from './children/settings'
import knowledge from './children/knowledge'

const routes: RouteRecordRaw[] = [
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
    ...playground,
    ...workspace,
    ...settings,
    ...knowledge,
    {
        path: '/:name',
        name: 'user',
        component: () => import('@/views/user/index.vue')
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
        path: '/error',
        name: 'nerror',
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

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})

export default router
