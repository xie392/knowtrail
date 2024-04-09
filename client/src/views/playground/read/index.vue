<script setup lang="ts">
import { DocService } from '@/api/doc.api'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { ReadEditor } from 'aomao/index'
import Sidebar from '@/layout/sidebar/index.vue'

const route = useRoute()

const docs = ref<any>()
const getDocDetail = async () => {
    if (!route.params.id) return
    const { data } = await DocService.GetDocByIdApi(route.params.id as string)
    if (!data) return
    console.log('doc', data)
    docs.value = data
}
getDocDetail()
</script>

<template>
    <div class="flex items-start">
        <div class="h-screen sticky top-0 left-0 bg-bgPrimary z-50 border-r border-gray-200 w-[260px]">
            <Sidebar :footer="false">
                <template #header>112342</template>
            </Sidebar>
        </div>
        <div class="flex-1 flex justify-center py-10">
            <div class="w-[90%]">
                <div
                    class="editor-title focus-visible:outline-none text-[28px] font-bold mb-5 border-b pb-2 break-all"
                    :textContent="docs?.title"
                />

                <div class="mt-3">
                    <ReadEditor :content="docs?.content ?? '无内容'" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
