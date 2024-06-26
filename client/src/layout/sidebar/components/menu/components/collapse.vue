<script setup lang="ts">
import { CategoryService } from '@/api/category.api'
import BookIcon from '@/components/icon/BookIcon.vue'
import { useBaseStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const { collapse } = storeToRefs(useBaseStore())

const categoryList = ref<any[]>([])
const getCategory = async () => {
    const { code, data } = await CategoryService.GetCategoryListApi({ page: 1, limit: 30 })
    if (code !== 200) return
    categoryList.value = data.list
    // console.log('data', data)
}
getCategory()

const visible = ref(false)
const pid = ref<string>('')
const handleConfirm = async () => {
    visible.value = false
    const { code } = await CategoryService.DeleteCategoryApi(pid.value)
    if (code !== 200) return
    getCategory()
}
</script>

<template>
    <div
        class="list flex w-full justify-between items-center pr-3 mb-1 relative py-2"
        :class="$route.name === 'knowledge' && 'list-active'"
    >
        <div class="absolute top-1/2 -translate-y-1/2 left-3 z-10">
            <t-button size="small" shape="square" theme="default" variant="text" @click="collapse = !collapse">
                <template #icon>
                    <t-icon :name="collapse ? 'caret-right-small' : 'caret-down-small'" size="small" />
                </template>
            </t-button>
        </div>
        <div to="/workspace/knowledge" class="flex w-full pl-10 justify-between items-center">
            <span class="text-[0.875rem]">知识库</span>
            <t-icon name="chevron-right" style="width: 18px; height: 18px" />
        </div>
    </div>

    <div class="w-full flex flex-col gap-1 max-h-[400px] overflow-y-auto scrollbar-none" v-show="!collapse">
        <div
            class="list w-full px-4 py-1 flex items-center justify-between cursor-pointer"
            v-for="(v, i) in categoryList"
            :key="i"
        >
            <div class="flex flex-1 items-center gap-2 relative">
                <!-- <t-icon name="drag-move" class="icon cursor-pointer opacity-0" style="width: 14px; height: 14px" /> -->
                <router-link class="flex items-center gap-[6px] flex-1 justify-start" :to="'/knowledge/' + v?.id">
                    <BookIcon size="24px" />
                    <div
                        class="text-[0.85rem] max-w-[110px] whitespace-nowrap overflow-hidden text-ellipsis select-none"
                        title="hahh"
                    >
                        {{ v?.title }}
                    </div>
                    <t-icon
                        :name="v.status === 0 ? 'https' : 'earth'"
                        style="width: 12px; height: 12px"
                        class="icon"
                    ></t-icon>
                </router-link>
            </div>

            <t-icon
                name="delete"
                class="opacity-0 icon"
                @click="
                    () => {
                        pid = v?.id
                        visible = true
                    }
                "
            ></t-icon>
        </div>

        <t-dialog
            :preventScrollThrough="false"
            showOverlay
            theme="danger"
            v-model:visible="visible"
            :onConfirm="handleConfirm"
        >
            <template #header>删除知识库</template>
            <p class="text-gray-500 text-center">删除后不可恢复，且会删除该知识库下所有内容，确定删除吗？</p>
        </t-dialog>
    </div>
</template>

<style scoped>
.list:hover .icon {
    opacity: 1;
}
</style>
