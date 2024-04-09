<script setup lang="ts">
import { ref } from 'vue'

interface Item {
    // title: string
    [key: string]: any
    children?: Item[]
}

interface TreeItemProps {
    item: Item
    level: number
    paddingLeft?: number
    el: HTMLElement
    // router: any
    // pid?: string
}

const defaultWidth = 180
const props = withDefaults(defineProps<TreeItemProps>(), {
    paddingLeft: 28
})

const itemRef = ref<HTMLDivElement | null>(null)

const collapse = ref<boolean>(false)

/**
 * 展开 / 折叠
 */
const toggle = () => {
    const level = props.el.dataset.level || 0
    const parentNodes = props.el.parentElement!.children
    props.el.dataset.collapse = collapse.value ? 'false' : 'true'

    for (let i = 0; i < parentNodes.length; i++) {
        const node = parentNodes[i] as HTMLElement
        const nodeLevel = node.dataset.level || 0
        const nodeCollapse = node.dataset.collapse || 'false'
        // 判断是否是同级
        if (nodeLevel > level) {
            if (collapse.value) {
                node.classList.remove('hidden')
                if (nodeCollapse === 'true') break
            } else {
                node.classList.add('hidden')
            }
        }
    }
    collapse.value = !collapse.value
}
</script>

<template>
    <div
        :style="{ paddingLeft: level !== 0 ? level * paddingLeft + 'px' : '' }"
        class="item px-2 py-[0.5rem] rounded hover:bg-hover cursor-pointer relative flex items-center justify-between mb-[4px]"
        :class="$route.params.id === item.id && 'list-active'"
        :data-id="item.id"
        :data-active="$route.params.id === item.id"
        ref="itemRef"
    >
        <router-link class="flex flex-1 gap-2 items-center" :to="`/doc/${$route.params.pid}/${item.id}`">
            <span class="w-5 flex items-center">
                <t-button
                    size="small"
                    shape="square"
                    variant="text"
                    class="h-full"
                    v-if="item.children && item.children.length !== 0"
                >
                    <template #icon>
                        <t-icon :name="collapse ? 'chevron-right' : 'chevron-down'" @click="toggle" />
                    </template>
                </t-button>
            </span>
            <p
                class="p-title text-[0.9rem] whitespace-nowrap overflow-hidden text-ellipsis select-none flex-1"
                :title="item.title"
                :style="{ maxWidth: `${defaultWidth - level * paddingLeft}px` }"
                :data-id="item.id"
                :id="`tree_${item.id}`"
            >
                {{ item.title }}
            </p>
        </router-link>
    </div>
</template>

<style scoped>
.item:hover .more {
    display: flex;
}
</style>
