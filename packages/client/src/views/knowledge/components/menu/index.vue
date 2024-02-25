<script setup lang="ts">
// import { ref } from 'vue'
import Tree from '@/components/tree/index.vue'
import { CategoryService } from '@/api/category.api'
import { useRoute } from 'vue-router'
// import { useTree, type TreeOptions } from '@/hooks/useTree'
import { ref, watch } from 'vue'
import { convertToTree, type TreeOptions } from '@/shared'
import { useDocStore } from '@/stores/doc'
import { storeToRefs } from 'pinia'
// import type { Docs } from '@/models/doc'

const docList = ref<any>()
const tree = ref<TreeOptions[]>([])
const route = useRoute()
const GetCategoryById = async () => {
    const { data } = await CategoryService.GetCategoryByIdApi(route.params.pid as string)
    if (!data) return
    docList.value = data
    tree.value = convertToTree(data.doc)
}
GetCategoryById()

const { doc } = storeToRefs(useDocStore())

watch(
    () => doc.value.title,
    (val) => {
        const item = docList.value?.doc?.find((v: any) => v.id === doc.value?.id)
        if (item) {
            item.title = val
            tree.value = convertToTree(docList.value.doc)
        }
    }
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
        <!-- <div class="py-2 px-5 flex items-center cursor-pointer my-2">
            <div class="flex items-center gap-3">
                <t-icon name="list" class=" w-8"></t-icon>
                <span class="text-[0.875rem] select-none">目录</span>
            </div>
        </div> -->
        <!-- <t-space direction="vertical" style="width: 100%"> -->
        <!-- </t-space> -->
    </div>
    <Tree :items="tree" />
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
