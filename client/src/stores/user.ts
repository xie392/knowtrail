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

        return {
            isLogin,
            user,
            logout
        }
    },
    {
        persist: true
    }
)
