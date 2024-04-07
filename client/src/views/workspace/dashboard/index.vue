<script setup lang="ts">
import Book from '@/components/book/index.vue'
import { faker } from '@faker-js/faker'

const getTableData = (total = 10) => {
    const data: any[] = []
    for (let i = 0; i < total; i++) {
        data.push({
            key: i + 1,
            name: faker.lorem.sentence(),
            belong: 'xiao/默认知识库',
            createTime: faker.date.anytime().toLocaleDateString().toString()
        })
    }
    return data
}

const tableData = getTableData()
const columns = [
    { colKey: 'name', title: '标题', width: '45%', ellipsis: true },
    { colKey: 'belong', title: '归属', ellipsis: true },
    { colKey: 'createTime', title: '访问时间', ellipsis: true },
    { colKey: 'operation', width: '150', title: '操作' }
]
</script>

<template>
    <div class="w-full p-7 px-10">
        <div class="mb-8">
            <div class="flex justify-between w-full mb-3">
                <h1 class="title">快捷访问</h1>
                <t-button>
                    新建知识库
                    <template #icon>
                        <t-icon name="add"></t-icon>
                    </template>
                </t-button>
            </div>
            <div class="flex gap-3 flex-wrap">
                <Book class="w-[24.15%]" :footer="false" v-for="v in 2" :key="v" />
            </div>
        </div>

        <div>
            <h1 class="title mb-3">最近访问</h1>
            <t-table row-key="key" :data="tableData" :columns="columns" :hover="true" lazy-load>
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
                            <t-icon name="ellipsis "></t-icon>
                        </template>
                    </t-button>
                </template>
            </t-table>
        </div>
    </div>
</template>

<style scoped></style>
