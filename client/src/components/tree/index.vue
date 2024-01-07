<script setup lang="ts">
import TreeItem from './components/tree-item/index.vue'
import { createApp, ref, onMounted } from 'vue'

interface Item {
    // title: string
    [key: string]: any
    children?: Item[]
}

interface TreeProps {
    items: Item[] | any[]
}

const testData: Item[] = [
    { title: '标题1' },
    {
        title: '标题2',
        children: [
            { title: '标题2.1' },
            {
                title: '标题2.2',
                children: [
                    { title: '标题2.2.1' },
                    {
                        title: '标题2.2.2',
                        children: [
                            {
                                title: '标题2.2.2.1',
                                children: [{ title: '标题2.2.2.1' }, { title: '标题2.2.2.2' }]
                            }
                        ]
                    }
                ]
            }
        ]
    }
]

defineProps<TreeProps>()
const treeRef = ref<HTMLHRElement | null>(null)

/**
 * 渲染树
 * @param items       树列表
 * @param container   容器
 */
const renderTree = (items: Item[], container: HTMLElement) => {
    if (!container) return

    const render = (item: Item, level: number = 0) => {
        const div = document.createElement('div')
        createApp(TreeItem, { item, level, el: div }).mount(div)
        div.dataset.level = `${level}`
        if (item.children && item.children.length !== 0) div.dataset.collapse = 'false'
        return div
    }

    const recursive = (item: Item) => {
        let level = 0
        const traverseTree = (node: Item) => {
            container.appendChild(render(node, level))

            if (node.children && node.children.length > 0) {
                level++
                node.children.forEach((child) => traverseTree(child))
            }
            return render(node, level)
        }
        traverseTree(item)
    }

    items.forEach((item) => recursive(item))
}

onMounted(() => {
    renderTree(testData, treeRef.value!)
})
</script>

<template>
    <!-- scrollbar-none 260 -->
    <div class="max-h-[calc(100vh-208px)] overflow-y-auto px-3" ref="treeRef"></div>
</template>

<style scoped></style>
