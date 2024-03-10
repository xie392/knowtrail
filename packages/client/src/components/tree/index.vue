<script setup lang="ts">
import TreeItem from './components/tree-item/index.vue'
import { createApp, ref, watch, type Ref } from 'vue'
import router from '@/router'
import { useObservable } from '@vueuse/rxjs'
import { liveQuery } from 'dexie'
import type { DOC } from '@/db/type'
import { useRoute } from 'vue-router'
import UserDBStore from '@/db'
import { convertToTree } from '@/shared'

interface Item {
    [key: string]: any
    children?: Item[]
}

const treeRef = ref<HTMLHRElement | null>(null)

const route = useRoute()
const pid = route.params.pid
const id = route.params.id
const docs: Ref<DOC[]> = useObservable(
    // @ts-ignore
    liveQuery(async () => await UserDBStore.findOneAllById(UserDBStore.tables.doc, 'category_id', pid))
)
const doc: Ref<DOC> = useObservable(
    // @ts-ignore
    liveQuery(async () => await UserDBStore.findOneById(UserDBStore.tables.doc, 'id', id))
)

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

watch(docs, (newVal, oldVal) => {
    if (newVal?.length !== oldVal?.length) {
        const trees = convertToTree(newVal)
        renderTree(trees, treeRef.value!)
    }
})

let init = true
watch(
    () => doc.value?.title,
    () => {
        if (!init) {
            const el = document.getElementById(`tree_${doc.value?.id}`)
            if (!el) return
            el.textContent = doc.value?.title
        }
        init = false
    }
)
</script>

<template>
    <!-- scrollbar-none 260 -->
    <div class="max-h-[calc(100vh-208px)] overflow-y-auto px-3" ref="treeRef"></div>
</template>

<style scoped></style>
