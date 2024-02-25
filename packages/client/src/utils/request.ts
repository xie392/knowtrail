import axios from 'axios'
import { useLogin } from '@/hooks/useLogin'
import { useUserStore } from '@/stores/user'

const request = axios.create({
    baseURL: import.meta.env.VITE_DEV_BASE_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

request.interceptors.request.use(
    (config) => {
        const { isLogin, user } = useLogin()
        if (isLogin.value) {
            config.headers.Authorization = user.value.accessToken
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

request.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        const { status } = error.response

        const userStore = useUserStore()

        console.log('useUserStore', userStore)

        switch (status) {
            case 401:
                // 未登录
                console.log('未登录')
                userStore.isLogin = false
                location.reload()
                break
            case 403:
                // 无权限
                break
            case 404:
                // 资源不存在
                break
            case 500:
                // 服务器错误
                break
        }
        return Promise.reject(error)
    }
)

export default request
