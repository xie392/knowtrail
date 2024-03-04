<script setup lang="ts">
import { computed, ref } from 'vue'
import { CategoryService } from '@/api/category.api'
import { MessagePlugin } from 'tdesign-vue-next';
import { useRouter } from 'vue-router';

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

// 搜索
const keyword = ref<string>('')
const desc = ref<string>('')
const value = ref<number>(1)

// 状态 1 正常 0 私有 2需要密码
const options = ref<{ [key: string]: any }[]>([
    { label: '私密', value: 1 },
    { label: '公开', value: 0 }
])

const router = useRouter()
const create = async () => {
    console.log("keyword",keyword.value, desc.value, value.value);
    try {
        const { code, data } = await CategoryService.CreateCategoryApi({
            title: keyword.value,
            description: desc.value,
            status: value.value
        })
        if(code!==200) return MessagePlugin.error('创建知识库失败')
        router.push(`/knowledge/${data.id}`)
    } catch (error) {
        MessagePlugin.error('创建知识库失败')
    }
    
}
</script>

<template>
    <div>
        <t-dialog
            :closeOnEscKeydown="true"
            :footer="true"
            preventScrollThrough
            v-model:visible="visible"
            header="新建知识库"
            width="500px"
        >
            <t-input clearable placeholder="请输入知识库名称" v-model="keyword" class="mb-3">
                <template #prefix-icon>
                    <t-icon name="book-open" size="small" />
                </template>
            </t-input>
            <div class="mb-2">
                <t-textarea
                    placeholder="知识库简介（选填）"
                    :maxcharacter="1000"
                    :autosize="{
                        maxRows: 4,
                        minRows: 4
                    }"
                    v-model="desc"
                />
            </div>
            <t-select :options="options" placeholder="选择知识库状态" v-model="value" />

            <template #footer>
               <t-button class="w-full" @click="create">创建</t-button>
            </template>
        </t-dialog>
    </div>
</template>

<style scoped></style>
