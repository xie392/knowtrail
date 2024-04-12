<script setup lang="ts">
import { CategoryService } from '@/api/category.api'
import { DocService } from '@/api/doc.api'
import Book from '@/components/book/index.vue'
import BooksModal from '@/components/modal/books-modal/index.vue'
//import { faker } from '@faker-js/faker'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const getTableData = (docs: any[] = []) => {
    const data: any[] = []
    for (let i = 0; i < docs.length; i++) {
        const doc = docs[i]
        data.push({
            key: doc?.id,
            name: doc?.title,
            belong: `${doc?.user?.nick_name}/${doc?.category?.title}`,
            createTime: new Date(doc?.update_time).toLocaleString(),
            ...doc
        })
    }
    return data
}

// const tableData = getTableData()
const columns = [
    { colKey: 'name', title: '标题', width: '45%', ellipsis: true },
    { colKey: 'belong', title: '归属', ellipsis: true },
    { colKey: 'createTime', title: '访问时间', ellipsis: true }
    // { colKey: 'operation', width: '150', title: '操作' }
]

const books_modal = ref(false)

const recentCategory = ref<any[]>([])
const getRecentCategory = async () => {
    const { data } = await CategoryService.GetRecentCategoryApi()
    if (!data) return []
    recentCategory.value = data
}
getRecentCategory()

const docs = ref<any[]>([])
const getRecentDocList = async () => {
    const { data } = await DocService.GetRecentDocListApi()
    if (!data) return []
    console.log('docs', data.docs)
    docs.value = getTableData(data.docs)
}
getRecentDocList()

const router = useRouter()
</script>

<template>
    <div class="w-full p-7 px-10">
        <div class="mb-8">
            <div class="flex justify-between w-full mb-3">
                <h1 class="title">快捷访问</h1>
                <t-button @click="books_modal = true">
                    新建知识库
                    <template #icon>
                        <t-icon name="add"></t-icon>
                    </template>
                </t-button>
            </div>
            <div class="flex gap-3 flex-wrap">
                <Book class="w-[24.15%]" :footer="false" v-for="v in recentCategory" :key="v" :item="v" />
            </div>
        </div>

        <div>
            <h1 class="title mb-3">最近访问</h1>
            <t-table
                row-key="key"
                :data="docs"
                :columns="columns"
                :hover="true"
                lazy-load
                :onRowClick="({ row }) => router.push(`/knowledge/${row?.category_id}/${row?.id}`)"
                class="cursor-pointer"
            >
            </t-table>
        </div>
    </div>

    <!-- 知识库 Modal -->
    <BooksModal v-model:visible="books_modal" />

    <!--
    <template #operation="{ row }">
        <t-button
            theme="default"
            variant="text"
            size="small"
            @click="
                () => {
                    console.log(row)
                }
            "
        >
            <template #icon>
                <t-icon name="delete"></t-icon>
            </template>
        </t-button>
    </template>
--></template>

<style scoped></style>
