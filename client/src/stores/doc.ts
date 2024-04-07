import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Docs } from '@/models/doc'

const defineDocs: Docs = {
    id: '',
    pid: '',
    title: '',
    content: '',
    cover: '',
    tag_type: '',
    p_id: ''
}

export const useDocStore = defineStore(
    'doc',
    () => {
        const doc = ref<Docs>(defineDocs as Docs)
        const readonly = ref<boolean>(true)

        // 文档是否创建
        const is_cretaed = ref<boolean>(false)
        // 文档是否更新
        const is_updated = ref<boolean>(true)
        // 上一次文档的 id
        const last_doc_id = ref<string>('')

        /**
         * 重置文档内容
         */
        const resetDoc = () => (doc.value = { ...defineDocs })

        return {
            doc,
            readonly,
            is_cretaed,
            is_updated,
            last_doc_id,
            resetDoc
        }
    },
    {
        persist: true
    }
)
