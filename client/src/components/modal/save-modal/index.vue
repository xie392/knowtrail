<script setup lang="ts">
import { type ProgressContext } from 'tdesign-vue-next'
import { computed, nextTick, ref, watch } from 'vue'
import { AddIcon } from 'tdesign-icons-vue-next'
import { BASE_URL } from '@/utils/constants'
import { useLogin } from '@/hooks/useLogin'
import { joinUrl } from '@/utils/utils'

const props = defineProps<{ visible: boolean; url?: string; tag_type?: string }>()
const emits = defineEmits(['update:visible', 'save'])

const visible = computed({
    get: () => props.visible,
    set: (value) => emits('update:visible', value)
})

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

const inputVisible = ref<boolean>(false)
const input = ref<HTMLInputElement | null>(null)
const tags = ref<string[]>([])

const handleClose = (index: number) => {
    tags.value.splice(index, 1)
}

const handleInputEnter = (val: string) => {
    if (tags.value.length === 5) {
        inputVisible.value = false
        return
    }

    if (val && !tags.value.includes(val)) {
        tags.value.push(val)
    }

    inputVisible.value = false
}

const handleClickAdd = () => {
    inputVisible.value = true
    nextTick(() => {
        input.value?.focus()
    })
}

const { user } = useLogin()
const save = () => {
    emits('save', { tags: tags.value.join(','), cover: cover.value })
    visible.value = false
}

watch(
    () => [props.url, props.tag_type],
    () => {
        if (props.tag_type) {
            tags.value = props.tag_type?.split(',')
        }

        if (props.url) {
            cover.value = props.url
        }
    }
)

const clearCover = () => {
    cover.value = ''
    files.value = []
}
</script>

<template>
    <div>
        <t-dialog
            :closeOnEscKeydown="true"
            :footer="false"
            preventScrollThrough
            v-model:visible="visible"
            header="保存文档"
            width="450px"
        >
            <div class="max-h-[300px] overflow-y-auto mt-2 mb-5">
                <p class="mb-2 text-[0.87rem] text-[#bab9b9]">封面</p>
                <div
                    class="group w-full h-[120px] relative flex justify-center items-center rounded-lg bg-gray-100 cursor-pointer"
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
                    v-else
                />
                <p class="mb-2 mt-5 text-[0.87rem] text-[#bab9b9]">标签</p>
                <t-space class="tag-block editable" break-line>
                    <t-tag
                        v-for="(tag, index) in tags"
                        :key="index"
                        theme="primary"
                        closable
                        :max-width="100"
                        @close="handleClose(index)"
                    >
                        {{ tag }}
                    </t-tag>
                    <t-tag v-if="!inputVisible" @click="handleClickAdd">
                        <add-icon />
                        添加标签
                    </t-tag>
                    <t-input
                        v-else
                        ref="input"
                        size="small"
                        style="width: 94px"
                        @blur="handleInputEnter"
                        @enter="handleInputEnter"
                    />
                </t-space>
            </div>
            <t-button block @click="save">保存</t-button>
        </t-dialog>
    </div>
</template>

<style scoped lang="scss">
::v-deep(.t-upload__card-item) {
    width: 100%;

    .t-upload__card-container {
        width: 100%;
    }

    .t-upload__card-content {
        width: 100%;
    }
}
</style>
