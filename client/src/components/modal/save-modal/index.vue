<script setup lang="ts">
import { type ProgressContext } from 'tdesign-vue-next'
import { computed, nextTick, ref } from 'vue'
import { AddIcon } from 'tdesign-icons-vue-next'
import { BASE_URL } from '@/utils/constants'

const props = defineProps<{ visible: boolean }>()
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

const handleFail = (error: any) => {
    console.log('error', error)
}

const handleSuccess = (res: any) => {
    console.log('res', res)
}

const onProgress = (options: ProgressContext) => {
    progress.value = options.percent
}

const inputVisible = ref<boolean>(false)
const input = ref<HTMLInputElement | null>(null)
const tags = ref<any[]>([])

const handleClose = (index: number) => {
    console.log(index)
    tags.value.splice(index, 1)
}

const handleInputEnter = (val: string) => {
    if (tags.value.length === 5) {
        inputVisible.value = false
        return
    }

    if (val && !tags.value.some((item) => item.name === val)) {
        tags.value.push({ name: val, type: 'default', showClose: true })
    }

    inputVisible.value = false
}

const handleClickAdd = () => {
    inputVisible.value = true
    nextTick(() => {
        input.value?.focus()
    })
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

                <!-- autoUpload -->
                <t-upload
                    :action="BASE_URL"
                    theme="image"
                    showUploadProgress
                    v-model="files"
                    @fail="handleFail"
                    @success="handleSuccess"
                    @progress="onProgress"
                    style="width: 100%"
                    accept="image/png; image/jpg;"
                />
                <p class="mb-2 mt-5 text-[0.87rem] text-[#bab9b9]">标签</p>
                <t-space class="tag-block editable" break-line>
                    <t-tag
                        v-for="(tag, index) in tags"
                        :key="index"
                        theme="primary"
                        :closable="tag.showClose"
                        :icon="tag.icon"
                        :disabled="!!tag.disabled"
                        :max-width="tag.maxWidth"
                        @close="handleClose(index)"
                    >
                        {{ tag.name }}
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
            <t-button block @click="emits('save', { tags })">保存</t-button>
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
