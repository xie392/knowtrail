import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { useDocStore } from '@/stores/doc'
import { useBaseStore } from '@/stores'

export const useLogin = () => storeToRefs(useUserStore())

export enum StoreName {
    USER = 'user',
    DOC = 'doc',
    BASE = 'base'
}

export const useStore = (storeName: StoreName) => {
    switch (storeName) {
        case StoreName.USER:
            return storeToRefs(useUserStore())
        case StoreName.DOC:
            return storeToRefs(useDocStore())
        case StoreName.BASE:
            return storeToRefs(useBaseStore())
        default:
            return null
    }
}
