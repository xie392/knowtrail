<script setup lang="ts">
import { DocService } from '@/api/doc.api'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { MessagePlugin } from 'tdesign-vue-next'
import UserStore from '@/db'

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

const route = useRoute()
const router = useRouter()
const visible = ref<boolean>(false)
const isActive = ref<boolean>(route.params.id === props.item.id)

const handleConfirm = async () => {
    const { code } = await DocService.DeleteDocApi(props.item.id)
    if (code !== 200) return MessagePlugin.error('删除失败')

    await UserStore.delete(UserStore.tables.doc, 'id', props.item.id)
    visible.value = false

    // 如果删除的是当前选中的文档, 则跳转到下一个，如果没有下一个就跳转到首页
    if (isActive) {
        const nextItem = itemRef.value?.parentElement?.nextElementSibling?.firstElementChild
        if (nextItem) {
            const dataId = nextItem.getAttribute('data-id')
            if (dataId) router.push(`/knowledge/${route.params.pid}/${dataId}`)
        } else {
            router.push(`/knowledge/${route.params.pid}`)
        }
    }
}
</script>

<template>
    <!-- @mouseenter="getMaxWidth($event)" -->
    <div
        :style="{ paddingLeft: level !== 0 ? level * paddingLeft + 'px' : '' }"
        class="item px-2 py-[0.5rem] rounded hover:bg-hover cursor-pointer relative flex items-center justify-between mb-[4px]"
        :class="$route.params.id === item.id && 'list-active'"
        :data-id="item.id"
        :data-active="$route.params.id === item.id"
        ref="itemRef"
    >
        <!-- @click="handlerClick($event)" -->
        <router-link class="flex flex-1 gap-2 items-center" :to="`/knowledge/${$route.params.pid}/${item.id}`">
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
        <div class="more hidden absolute right-0 bg-hover px-2 gap-[6px]">
            <t-button size="small" shape="square" variant="text" theme="danger" @click="visible = true">
                <template #icon>
                    <t-icon name="delete" />
                </template>
            </t-button>
            <!-- <t-button size="small" shape="square" variant="text">
                <template #icon>
                    <t-icon name="add" />
                </template>
            </t-button> -->
        </div>

        <t-dialog
            :preventScrollThrough="false"
            showOverlay
            theme="danger"
            v-model:visible="visible"
            :onConfirm="handleConfirm"
        >
            确认删除该文档吗？
        </t-dialog>
    </div>
</template>

<style scoped>
.item:hover .more {
    display: flex;
}
</style>
