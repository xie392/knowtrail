<script setup lang="ts">
import TreeItem from './components/tree-item/index.vue'
import { createApp, ref, watch } from 'vue'
import router from '@/router'
import { differenceWith, isEqual } from 'lodash-es'

interface Item {
    [key: string]: any
    children?: Item[]
}

interface TreeProps {
    items: Item[] | any[]
}

const props = defineProps<TreeProps>()
const treeRef = ref<HTMLHRElement | null>(null)
const trees = ref<Item[] | any[]>(props.items)

/**
 * 渲染树
 * @param items       树列表
 * @param container   容器
 * @param isFrist     是否是第一次
 */
const renderTree = (items: Item[], container: HTMLElement, isFrist: boolean) => {
    if (!container) return

    if (!isFrist) {
        // 对比
        const diff = differenceWith(items, trees.value, isEqual)
        console.log('diff', diff)

        diff.forEach((item) => {
            const p = document.querySelector(`[data-id="${item.id}"]`)
            if (p) p.textContent = item.title
        })

        return
    }

    const render = (item: Item, level: number = 0) => {
        const div = document.createElement('div')
        createApp(TreeItem, { item, level, el: div }).use(router).mount(div)
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

let frist = true

watch(
    () => props.items,
    () => {
        renderTree(props.items, treeRef.value!, frist)
        trees.value = props.items
        if (frist) frist = false
    }
)

// watch(
//     () => trees.value,
//     () => {
//         renderTree(trees.value, treeRef.value!)
//     },
//     { once: true }
// )

// watchEffect(() => {
//     renderTree(props.items, treeRef.value!)
// })
</script>

<template>
    <!-- scrollbar-none 260 -->
    <div class="max-h-[calc(100vh-208px)] overflow-y-auto px-3" ref="treeRef"></div>
</template>

<style scoped></style>
