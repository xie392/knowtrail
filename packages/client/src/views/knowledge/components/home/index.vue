<script setup lang="ts">
import { useRoute } from 'vue-router'
import { CategoryService } from '@/api/category.api'
import { ref } from 'vue'

const route = useRoute()

const doc = ref<any>()
const getCtegoryList = async () => {
    const { code, data } = await CategoryService.GetCategoryByIdApi(route.params.pid as string)
    if (code !== 200) return
    console.log('data', data)
    doc.value = data
}
getCtegoryList()
</script>

<template>
    <div class="w-full min-h-screen bg-bgSecondary flex justify-center items-center py-16 px-20">
        <div class="w-full bg-white min-h-[80vh] rounded-lg p-5 px-10 bg-opacity-7z5 backdrop-blur-lg">
            <div class="w-full flex justify-between items-center py-4">
                <h2 class="text-2xl font-bold max-w-[80%] overflow-hidden text-ellipsis whitespace-nowrap">
                    {{ doc?.title }}
                </h2>
                <t-space>
                    <t-button variant="outline">
                        <template #icon>
                            <t-icon name="star"></t-icon>
                        </template>
                        收藏
                    </t-button>
                    <t-button variant="outline">
                        <template #icon>
                            <t-icon name="share"></t-icon>
                        </template>
                        分享
                    </t-button>

                    <t-popup showArrow placement="left-top" trigger="click">
                        <t-button variant="outline">触发元素</t-button>
                        <template #content>
                            <div>
                                <t-button variant="text" class="w-[200px] mb-2" block>触发元素</t-button>
                                <t-button variant="text" class="w-[200px] mb-2" block>触发元素</t-button>
                                <t-button variant="text" class="w-[200px] mb-2" block>触发元素</t-button>
                            </div>
                        </template>
                    </t-popup>
                </t-space>
            </div>

            <div class="w-full py-10">
                <h3>欢迎来到知识库</h3>
                <p>{{ doc?.description }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
