<script setup lang="ts">
import { ref } from 'vue'
import Tree from '@/components/tree/index.vue'
import { CategoryService } from '@/api/category.api'
import { useRoute } from 'vue-router'

const treeRef = ref<HTMLElement | null>(null)

const items = [
    {
        value: '1',
        label: '1',
        children: [
            {
                value: '1.1',
                label: '1.1'
            }
        ]
    },
    {
        value: '2',
        label: '2'
    }
]

// 获取知识库详情
const route = useRoute()
const GetCategoryById = async () => {
    const { data } = await CategoryService.GetCategoryByIdApi(route.params.pid as string)
    if (data) {
        console.log('data', data)
    }
}
// GetCategoryById()
</script>

<template>
    <div class="px-3">
        <RouterLink
            class="list py-2 px-5 flex items-center gap-3 cursor-pointer my-2"
            :class="!$route.params.id && 'list-active'"
            :to="`/knowledge/${$route.params.pid}`"
        >
            <t-icon name="home" class=""></t-icon>
            <span class="text-[0.875rem] select-none">首页</span>
        </RouterLink>
        <!-- <div class="py-2 px-5 flex items-center cursor-pointer my-2">
            <div class="flex items-center gap-3">
                <t-icon name="list" class=" w-8"></t-icon>
                <span class="text-[0.875rem] select-none">目录</span>
            </div>
        </div> -->
        <!-- <t-space direction="vertical" style="width: 100%"> -->
        <!-- </t-space> -->
    </div>
    <Tree :items="items" />
</template>

<style scoped lang="scss">
::v-deep(.t-tree__item) {
    padding: 0 8px;
    border-radius: 4px;
    margin-bottom: 6px;
    transition: 0.3s;

    &:hover {
        background-color: var(--td-bg-color-container-hover);
    }
}

::v-deep(.t-is-active) {
    color: var(--td-brand-color);
    background-color: var(--td-brand-color-light);

    & .t-tree__label {
        background-color: none;
    }
}
</style>
