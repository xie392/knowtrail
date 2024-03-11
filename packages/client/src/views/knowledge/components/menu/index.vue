<script setup lang="ts">
import Tree from '@/components/tree/index.vue'
import { CategoryService } from '@/api/category.api'
import { useRoute } from 'vue-router'
import { watch } from 'vue'
import UserDBStore from '@/db'

const route = useRoute()
const GetCategoryById = async () => {
    const { data } = await CategoryService.GetCategoryByIdApi(route.params.pid as string)
    if (!data) return

    const docs = await UserDBStore.findOneById(UserDBStore.tables.docs, 'id', route.params.pid as string)
    
    // 更新文档库
    if (docs) {
        await UserDBStore.update(UserDBStore.tables.docs, 'id', route.params.pid as string, {
            ...docs,
            ...data
        })
    } else {
        await UserDBStore.add(UserDBStore.tables.docs, data)
    }

    data?.doc?.forEach(async (item: any) => {
        const doc = await UserDBStore.findOneById(UserDBStore.tables.doc, 'id', item.id)
        if (doc) {
            await UserDBStore.update(UserDBStore.tables.doc, 'id', item.id, {
                ...doc,
                ...item
            })
        } else {
            await UserDBStore.add(UserDBStore.tables.doc, {
                ...item,
                readonly: true
            })
        }
    })
}

watch(
    route,
    () => {
        GetCategoryById()
    },
    { immediate: true }
)
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
    </div>
    <Tree />
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
