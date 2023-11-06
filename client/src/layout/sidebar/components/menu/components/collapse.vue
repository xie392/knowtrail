<script setup lang="ts">
import BookIcon from '@/components/icon/BookIcon.vue'
import { useBaseStore } from '@/stores'
import { storeToRefs } from 'pinia'

const { collapse } = storeToRefs(useBaseStore())
</script>

<template>
    <div
        class="list flex w-full justify-between items-center pr-3 mb-1 relative py-2"
        :class="$route.name === 'knowledge' && 'list-active'"
    >
        <div class="absolute top-1/2 -translate-y-1/2 left-3 z-10">
            <t-button
                size="small"
                shape="square"
                theme="default"
                variant="text"
                @click="collapse = !collapse"
            >
                <template #icon>
                    <t-icon
                        :name="collapse ? 'caret-right-small' : 'caret-down-small'"
                        size="small"
                    />
                </template>
            </t-button>
        </div>
        <router-link
            to="/workspace/knowledge"
            class="flex w-full pl-10 justify-between items-center"
        >
            <span class="text-[0.875rem]">知识库</span>
            <t-icon name="chevron-right" style="width: 18px; height: 18px" />
        </router-link>
    </div>

    <div class="w-full flex flex-col gap-1 h-[210px] overflow-y-auto books" v-show="!collapse">
        <div
            class="list w-full px-4 py-1 flex items-center justify-between cursor-pointer"
            v-for="v in 10"
            :key="v"
        >
            <div class="flex items-center gap-2 relative">
                <t-icon
                    name="drag-move"
                    class="icon cursor-pointer opacity-0"
                    style="width: 14px; height: 14px"
                />
                <div class="flex items-center gap-[6px]">
                    <BookIcon size="24px" />
                    <router-link
                        :to="'/knowledge/' + v"
                        class="text-[0.85rem] max-w-[110px] whitespace-nowrap overflow-hidden text-ellipsis select-none"
                        title="hahh"
                    >
                        知识库知识是试试ihsihi是ihsi而发热发光可能
                    </router-link>
                    <t-icon
                        :name="v % 2 === 0 ? 'https' : 'earth'"
                        style="width: 12px; height: 12px"
                        class="icon"
                    ></t-icon>
                </div>
            </div>

            <t-icon name="ellipsis" class="opacity-0 icon"></t-icon>
        </div>
    </div>
</template>

<style scoped>
.list:hover .icon {
    opacity: 1;
}

.books::-webkit-scrollbar {
    display: none;
}
</style>
