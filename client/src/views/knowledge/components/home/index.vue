<script setup lang="ts">
import { useRoute } from 'vue-router'
import { CategoryService } from '@/api/category.api'
import { ref, watch } from 'vue'

// interface Options {
//     name: string
//     icon: any
//     divider?: boolean
//     onclick: () => void
// }

const route = useRoute()

const doc = ref<any>()
const getCtegoryList = async () => {
    const { code, data } = await CategoryService.GetCategoryByIdApi(route.params.pid as string)
    if (code !== 200) return
    console.log('data', data)
    doc.value = data
}

watch(
    route,
    () => {
        getCtegoryList()
    },
    { immediate: true }
)

// const options: Options[] = [
//     {
//         name: '重命名',
//         icon: 'add',
//         onclick: async () => {}
//     },
//     {
//         name: '编辑首页',
//         icon: 'add',

//         onclick: () => {}
//     },
//     {
//         name: '更多设置',
//         icon: 'add',
//         divider: true,
//         onclick: async () => {}
//     },
//     {
//         name: '删除',
//         icon: 'add',
//         onclick: async () => {}
//     }
// ]
</script>

<template>
    <div class="w-full min-h-screen bg-bgSecondary flex justify-center items-center py-16 px-20">
        <div class="w-full bg-white min-h-[80vh] rounded-lg p-5 px-10 bg-opacity-7z5 backdrop-blur-lg">
            <div class="w-full flex justify-between items-center py-4">
                <h2 class="text-2xl font-bold max-w-[80%] overflow-hidden text-ellipsis whitespace-nowrap">
                    {{ doc?.title }}
                </h2>
                <!-- <t-space>
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
                    <t-dropdown placement="left-top" trigger="click">
                        <t-button variant="outline" shape="square">
                            <template #icon>
                                <t-icon name="more" size="small" />
                            </template>
                        </t-button>

                        <t-dropdown-menu>
                            <t-dropdown-item
                                style="max-width: 150px"
                                v-for="(item, index) in options"
                                :key="index"
                                :value="index"
                                @click="item.onclick"
                            >
                                <div class="flex items-center gap-2 px-2 py-1 min-w-[120px]">
                                    <t-icon :name="item.icon"></t-icon>
                                    <span class="text-[0.9rem]">{{ item.name }}</span>
                                </div>
                                <t-divider v-if="item!.divider" />
                            </t-dropdown-item>
                        </t-dropdown-menu>
                    </t-dropdown>
                </t-space> -->
            </div>

            <div class="w-full py-10">
                <p v-if="doc?.description">{{ doc?.description }}</p>
                <h3 v-else>欢迎来到知识库</h3>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
