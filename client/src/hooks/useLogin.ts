import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

export const useLogin = () => storeToRefs(useUserStore())
