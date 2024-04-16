<script setup lang="ts">
import { computed, ref } from 'vue'
import { CategoryService } from '@/api/category.api'
import { MessagePlugin, type ProgressContext } from 'tdesign-vue-next'
import { useRouter } from 'vue-router'
import { joinUrl } from '@/utils/utils'
import { BASE_URL } from '@/utils/constants'
import { useLogin } from '@/hooks/useLogin'

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
    // console.log('keyword', keyword.value, desc.value, value.value)
    try {
        const { code, data } = await CategoryService.CreateCategoryApi({
            title: keyword.value,
            description: desc.value,
            status: value.value,
            cover: cover.value
        })
        if (code !== 200) return MessagePlugin.error('创建知识库失败')
        visible.value = false
        router.push(`/knowledge/${data.id}`)
    } catch (error) {
        MessagePlugin.error('创建知识库失败')
    }
}

/**
 * 上传模块
 */
const files = ref<any[]>([])
const progress = ref<number>(0)
const cover = ref<string>('')

const handleFail = (error: any) => {
    console.log('error', error)
}

const handleSuccess = (res: any) => {
    // console.log('上传成功', res)
    cover.value = res.response?.data?.url
}

const onProgress = (options: ProgressContext) => {
    progress.value = options.percent
}

const clearCover = () => {
    cover.value = ''
    files.value = []
}

const { user } = useLogin()
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
            <div
                class="group w-full h-[120px] relative flex justify-center items-center rounded-lg bg-gray-100 cursor-pointer mb-3"
                v-if="cover"
            >
                <img :src="joinUrl(cover)" alt="" class="w-full max-h-[120px] object-cover rounded" />
                <div
                    class="group-hover:flex transition duration-300 hidden w-full h-full justify-center items-center bg-black bg-opacity-50 absolute top-0 left-0"
                >
                    <t-icon class="text-white text-xl" name="delete" @click="clearCover" />
                </div>
            </div>
            <t-upload
                :action="BASE_URL + '/upload/image'"
                theme="image"
                showUploadProgress
                v-model="files"
                @fail="handleFail"
                @success="handleSuccess"
                @progress="onProgress"
                style="width: 100%"
                accept="image/png; image/jpeg; image/gif; image/svg+xml; image/webp; image/jpg"
                :headers="{ Authorization: user?.accessToken }"
                class="mb-3"
                tips="上传封面图片"
                v-else
            />
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
