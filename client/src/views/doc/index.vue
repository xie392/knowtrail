<script setup lang="ts">
import { DocService } from '@/api/doc.api'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ReadEditor } from 'aomao/index'
import Sidebar from '@/layout/sidebar/index.vue'
import { CategoryService } from '@/api/category.api'
import Menu from './components/menu.vue'
import { joinUrl } from '@/utils/utils'

const route = useRoute()

const docs = ref<any>()
const getDocDetail = async () => {
    if (!route.params.id) return
    const { data } = await DocService.GetDocByIdApi(route.params.id as string)
    if (!data) return
    console.log('doc', data)
    docs.value = data
}

const category = ref<any>([])
const getCategory = async () => {
    const { data } = await CategoryService.GetCategoryByIdApi(route.params.pid as string)
    if (!data) return
    console.log('getCategory', data)
    category.value = data.doc
}

watch(
    () => route.params,
    () => {
        getDocDetail()
        getCategory()
    },
    { immediate: true }
)
</script>

<template>
    <div class="flex items-start">
        <div class="h-screen sticky top-0 left-0 bg-bgPrimary z-50 border-r border-gray-200 w-[260px]">
            <Sidebar :footer="false">
                <template #header>
                    <Menu :key="$route.fullPath + Math.random()" :items="category" />
                </template>
            </Sidebar>
        </div>
        <div class="flex-1 flex justify-center py-10">
            <div class="flex-1 px-10">
                <div class="w-full bg-gray-200 max-h-[200px] mb-5 relative" v-if="docs?.cover">
                    <img :src="joinUrl(docs?.cover)" alt="" class="w-full max-h-[200px] rounded-lg object-cover" />
                </div>
                <div
                    class="editor-title focus-visible:outline-none text-[28px] font-bold mb-5 border-b pb-2 break-all"
                    :textContent="docs?.title"
                />

                <div class="mt-3">
                    <ReadEditor :content="docs?.content ?? '无内容'" />
                </div>
            </div>
            <div class="w-[300px]"></div>
        </div>
    </div>
</template>

<style scoped></style>
