<script setup lang="ts">
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
    { colKey: 'name', title: '名称', width: '45%', ellipsis: true },
    { colKey: 'belong', title: '归属', ellipsis: true },
    { colKey: 'createTime', title: '时间', ellipsis: true },
    { colKey: 'operation', width: '150', title: '操作' }
]
</script>

<template>
    <div class="w-full p-7 px-10">
        <div class="flex justify-between mb-3">
            <h1 class="title">收藏</h1>
            <t-space>
                <t-select>
                    <t-option key="apple" label="Apple" value="apple" />
                    <t-option key="orange" label="Orange" value="orange" />
                    <t-option key="banana" label="Banana" value="banana" />
                </t-select>

                <t-button>
                    新建收藏夹
                    <template #icon>
                        <t-icon name="add"></t-icon>
                    </template>
                </t-button>
            </t-space>
        </div>

        <t-table
            row-key="key"
            :data="tableData"
            :columns="columns"
            :hover="true"
            lazy-load
            max-height="calc(100vh - 100px)"
        >
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
</template>

<style scoped></style>
