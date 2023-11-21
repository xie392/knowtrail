<script setup lang="ts">
import { ref } from 'vue'
import Tree from '@/components/tree/index.vue'

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
</script>

<template>
    <div class="px-3">
        <RouterLink
            class="list py-2 px-2 flex items-center gap-3 cursor-pointer mb-2"
            :class="!$route.params.id && 'list-active'"
            :to="`/knowledge/${$route.params.pid}`"
        >
            <t-icon name="home" class="icon"></t-icon>
            <span class="text-[0.875rem] select-none">首页</span>
        </RouterLink>
        <t-space direction="vertical" style="width: 100%">
            <!-- <t-tree
                ref="treeRef"
                :data="items"
                :activable="true"
                empty="还没有文档"
                expandAll
                :onClick="
                    ({ node }) => $router.push(`/knowledge/${$route.params.pid}/${node.value}`)
                "
            >
                <template #operations="{ node }">操作</template>
            </t-tree> -->
            <Tree :items="items" />
        </t-space>
    </div>
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
