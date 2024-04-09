<script setup lang="ts">
import MenuItem from './menu-item.vue'
import { createApp, onMounted, ref } from 'vue'
import router from '@/router'

interface MenuProps {
    items: any[]
}
const props = defineProps<MenuProps>()

interface Item {
    [key: string]: any
    children?: Item[]
}
const treeRef = ref<HTMLHRElement | null>(null)

/**
 * 渲染树
 * @param items       树列表
 * @param container   容器
 */
const renderTree = (items: Item[], container: HTMLElement) => {
    if (!container) return

    // 清除之前的树
    container.innerHTML = ''

    const render = (item: Item, level: number = 0) => {
        const div = document.createElement('div')
        createApp(MenuItem, { item, level, el: div }).use(router).mount(div)
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
    if (treeRef.value) renderTree(props.items, treeRef.value)
})
</script>

<template>
    <div class="flex-1 overflow-y-auto px-3 pt-10" ref="treeRef"></div>
</template>

<style scoped></style>
