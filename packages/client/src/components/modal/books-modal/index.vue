<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { CategoryService } from '@/api/category.api'

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
</script>

<template>
    <div>
        <t-dialog
            :closeOnEscKeydown="true"
            :footer="false"
            preventScrollThrough
            v-model:visible="visible"
            header="新建知识库"
            width="500px"
        >
            <p class="mb-2 text-[0.87rem] text-[#bab9b9]">知识库名称</p>
            <t-input clearable placeholder="请输入知识库名称" v-model="keyword">
                <template #prefix-icon>
                    <t-icon name="book-open" size="small" />
                </template>
            </t-input>
        </t-dialog>
    </div>
</template>

<style scoped></style>
