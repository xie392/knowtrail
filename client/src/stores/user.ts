import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/models/user'

export const useUserStore = defineStore(
    'user',
    () => {
        const isLogin = ref<boolean>(true)
        const user = reactive<User>({} as User)

        return {
            isLogin,
            user
        }
    },
    {
        persist: true
    }
)
