<script setup lang="ts">
import { useDocStore } from '@/stores/doc'
import { storeToRefs } from 'pinia'
import { Status } from '@/utils/constants'
import { DocService } from '@/api/doc.api'

const docStore = useDocStore()
const { doc, readonly } = storeToRefs(docStore)

const sumbit = async (type: Status) => {
    readonly.value = type === Status.EDIT ? false : true
    // 更新
    if (type === Status.PREVIEW) {
        // TODO: 更新接口
        // const { code, data, msg } = await DocService.CreateDocApi(doc.value)
        // if (code !== 200) return
        // console.log('data', data, msg)
    }
}
</script>

<template>
    <div
        class="w-full h-14 bg-bgPrimary flex justify-between items-center px-5 sticky top-0 z-50 border-b border-gray-200"
    >
        <div>
            <h2
                class="max-w-[400px] text-ellipsis whitespace-nowrap overflow-hidden"
                :title="doc.title"
            >
                {{ doc.title }}
            </h2>
        </div>
        <div class="flex gap-2">
            <!-- <t-button variant="text">
                <template #icon>
                    <t-icon name="star"></t-icon>
                </template>
            </t-button> -->
            <t-button theme="primary" v-if="readonly" @click="sumbit(Status.EDIT)">编辑</t-button>
            <t-button theme="primary" v-else @click="sumbit(Status.PREVIEW)">更新</t-button>
        </div>
    </div>
</template>

<style scoped></style>
