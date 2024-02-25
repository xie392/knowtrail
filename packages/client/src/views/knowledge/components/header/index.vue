<script setup lang="ts">
import { useRoute } from 'vue-router'
import { DocService } from '@/api/doc.api'
import { STATUS } from '@/shared'
import { useDocStore } from '@/stores/doc'
import { storeToRefs } from 'pinia'
import { MessagePlugin } from 'tdesign-vue-next'
import { omit } from 'lodash-es'
import { watch } from 'vue'

const { doc, readonly, last_doc_id } = storeToRefs(useDocStore())
const route = useRoute()

const updateDocReadonly = async (type?: STATUS, id?: string) => {
    if (type === STATUS.PREVIEW) {
        const { code, data } = await DocService.UpdateDocApi(
            id ?? (route.params.id as string),
            // @ts-ignore
            omit(doc.value, ['create_time', 'update_time', 'author'])
        )
        if (code !== 200) return MessagePlugin.error('更新文档失败')
        readonly.value = true
        doc.value = data
    } else {
        readonly.value = false
    }
}

last_doc_id.value = route.params.id as string
watch(
    () => route.params.id,
    () => {
        if (!readonly.value) {
            updateDocReadonly(STATUS.PREVIEW, last_doc_id.value)
            last_doc_id.value = route.params.id as string
        }
    }
)
</script>

<template>
    <div
        class="w-full h-14 bg-bgPrimary flex justify-between items-center px-5 sticky top-0 z-10 border-b border-gray-200"
    >
        <div>
            <h2 class="max-w-[400px] text-ellipsis whitespace-nowrap overflow-hidden" :title="doc?.title">
                {{ doc?.title }}
            </h2>
        </div>
        <div class="flex gap-2">
            <t-button variant="text">
                <template #icon>
                    <t-icon name="star"></t-icon>
                </template>
            </t-button>
            <t-button theme="primary" v-if="readonly" @click="updateDocReadonly(STATUS.EDIT)">编辑</t-button>
            <t-button theme="primary" v-else @click="updateDocReadonly(STATUS.PREVIEW)">更新</t-button>
        </div>
    </div>
</template>

<style scoped></style>
