<script setup lang="ts">
import { onMounted, nextTick, ref } from 'vue'
import type EditorJS from '@editorjs/editorjs'

// const editor = ref<EditorJS>()
const readOnly = ref<boolean>(false)

// onMounted(async () => {
//     await nextTick()
//     console.log('editor', window.__EDITOR__)
//     if (!window.__EDITOR__) return
//     editor.value = window.__EDITOR__
//     readOnly.value = editor.value?.readOnly?.isEnabled || false
// })
</script>

<template>
    <div
        class="w-full h-14 bg-bgPrimary flex justify-between items-center px-5 sticky top-0 z-50 border-b border-gray-200"
    >
        <div>笔记</div>
        <div class="flex gap-2">
            <t-button variant="text">
                <template #icon>
                    <t-icon name="star"></t-icon>
                </template>
            </t-button>
        </div>
    </div>
</template>

<style scoped></style>
