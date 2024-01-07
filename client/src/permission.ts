import router from './router'
import { useHead } from '@unhead/vue'
import { useLogin } from '@/hooks/useLogin'

const whiteList = ['login', 'register', 'forgot']

router.beforeEach((to, from, next) => {
    const { isLogin } = useLogin()
    const auth = to.meta.auth ?? true
    if (isLogin.value) {
        if (to.path === '/') {
            return next({ path: '/workspace/dashboard' })
        }
        whiteList.includes(to.name as string) ? next({ name: 'home' }) : next()
    } else {
        auth ? next({ name: 'login', query: { redirect: to.fullPath } }) : next()
    }
})

router.afterEach((to) => {
    const title = to.meta.title ? to.meta.title + ' · 知迹' : '知迹'
    useHead({ title })
})
