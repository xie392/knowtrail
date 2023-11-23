<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import LibraryIcon from '@/components/icon/LibraryIcon.vue'
import { CategoryService } from '@/api/category.api'
import { DocService } from '@/api/doc.api'
import { useRouter } from 'vue-router'
import { useDocStore } from '@/stores/doc'
import { storeToRefs } from 'pinia'

const props = defineProps<{ visible: boolean }>()
const emits = defineEmits(['update:visible'])
const visible = computed({
    get() {
        return props.visible
    },
    set(value) {
        emits('update:visible', value)
    }
})

// 获取知识库列表
const list = ref<any[]>([])
const GetCategoryList = async () => {
    const { data } = await CategoryService.GetCategoryListApi()
    if (data) {
        list.value = data.list
    }
}
watch(visible, (value) => value && GetCategoryList())

// 搜索
const keyword = ref<string>('')
const categoryList = computed(() => {
    return list.value.filter((item) => item.title.includes(keyword.value))
})

// 选择
const router = useRouter()
const { doc } = storeToRefs(useDocStore())
const handleCilck = async (id: string) => {
    // 创建文档
    const { data } = await DocService.CreateDocApi({ pid: id })
    if (data) {
        visible.value = false
        doc.value.id = data.id
        doc.value.pid = id
        router.push(`/knowledge/${id}/${data.id}`)
    }
}
</script>

<template>
    <div>
        <t-dialog
            :closeOnEscKeydown="true"
            :footer="false"
            preventScrollThrough
            v-model:visible="visible"
            header="新建文档"
            width="500px"
        >
            <p class="mb-2 text-[0.87rem] text-[#bab9b9]">请选择一个知识库</p>
            <t-input clearable placeholder="请输入文档名称" v-model="keyword">
                <template #prefix-icon>
                    <t-icon name="search" size="small" />
                </template>
            </t-input>
            <div class="max-h-[300px] overflow-y-auto mt-2">
                <t-list :split="true">
                    <t-list-item
                        v-for="(item, index) in categoryList"
                        :key="index"
                        style="padding-left: 10px"
                        class="hover:bg-gray-100 rounded cursor-pointer"
                        @click="handleCilck(item.id)"
                    >
                        <div class="flex gap-2 items-center w-full">
                            <LibraryIcon size="16px" />
                            <span class="ml-1 text-[#8a8f8d] text-[0.9rem] flex items-center">
                                {{ item.user.nick_name }}&nbsp;/&nbsp;{{ item.title }}
                                <span class="ml-1">
                                    <t-icon :name="item.status === 1 ? 'earth' : 'https'" />
                                </span>
                            </span>
                        </div>
                    </t-list-item>
                </t-list>
            </div>
        </t-dialog>
    </div>
</template>

<style scoped></style>
