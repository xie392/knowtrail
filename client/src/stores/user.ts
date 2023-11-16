import { ref } from 'vue'
import { defineStore } from 'pinia'
// import type { User } from '@/models/user'

export const useUserStore = defineStore(
    'user',
    () => {
        const isLogin = ref<boolean>(false)
        const user = ref<any>()

        return {
            isLogin,
            user
        }
    },
    {
        persist: true
    }
)
