import { ref } from 'vue'
import { defineStore } from 'pinia'
import { removeAllCookie } from '@/utils/cookies'
// import type { User } from '@/models/user'

export const useUserStore = defineStore(
    'user',
    () => {
        const isLogin = ref<boolean>(false)
        const user = ref<any>()

        const logout = () => {
            removeAllCookie()
            isLogin.value = false
            user.value = null
            location.reload()
        }

        // 更新用户信息
        const updateUserInfo = (userInfo: any) => {
            user.value.data = userInfo
        }

        return {
            isLogin,
            user,
            logout,
            updateUserInfo
        }
    },
    {
        persist: true
    }
)
