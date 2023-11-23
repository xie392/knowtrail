import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Docs } from '@/models/doc'
import { Status } from '@/utils/constants'

const defineDoc: Docs = {
    id: '',
    title: '',
    content: '',
    pid: ''
}

export const useDocStore = defineStore(
    'doc',
    () => {
        // 只读
        const readonly = ref<boolean>(false)
        // 文档
        const doc = ref<Docs>(defineDoc)
        // 文档状态
        const status = ref<Status>(Status.PREVIEW)

        const setDoc = (key: keyof Docs, value: any) => {
            doc.value[key] = value
        }
        const updateDoc = (data: Partial<Docs>) => Object.assign(doc.value, data)
        const clearDoc = () => {
            doc.value = defineDoc
        }

        return {
            doc,
            readonly,
            status,
            setDoc,
            updateDoc,
            clearDoc
        }
    },
    {
        persist: false
    }
)
