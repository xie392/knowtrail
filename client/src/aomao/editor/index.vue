<script setup lang="ts">
import Engine, { type EngineInterface } from '@aomao/engine'
import Toolbar from '../toolbar'
import { onMounted, onUnmounted, ref, watchEffect } from 'vue'
import { defaultPCToolbarItems } from 'aomao/config'
import { useFocus } from '@vueuse/core'
import type { Docs } from '@/models/doc'
import { useDocStore } from '@/stores/doc'
import { storeToRefs } from 'pinia'
import { debounce } from '@/utils/utils'
import { createEditor } from 'aomao/utils/createEditor'

const docStore = useDocStore()
const { doc, readonly } = storeToRefs(docStore)

interface EditorProps {
    toolbarClassName?: string
}
const props = withDefaults(defineProps<EditorProps>(), {})
const editor = ref<EngineInterface | null>()
const editorRef = ref<HTMLDivElement | null>(null)

const init = () => {
    if (!editorRef.value) return

    const engine = createEditor(editorRef.value, { readonly: readonly.value })

    if (!engine) return
    doc.value.content && engine.setValue(doc.value.content)

    engine.on('change', () => {
        const fn = debounce(() => {
            doc.value.content = engine.model.toValue()
        }, 1000)
        fn()
    })

    editor.value = engine
}

watchEffect(() => {
    if (editor.value) {
        editor.value.readonly = readonly.value
    }
})

onMounted(() => {
    init()
})

onUnmounted(() => {
    editor.value!.destroy()
})
</script>

<template>
    <div class="w-full pb-10">
        <div
            class="w-full fixed z-50 flex items-center px-3 bg-bgPrimary justify-center min-h-[40px] border-b border-gray-200"
            v-if="!readonly"
            :class="props.toolbarClassName"
        >
            <Toolbar
                v-if="editor"
                :engine="editor as EngineInterface"
                :items="defaultPCToolbarItems"
                :readonly="readonly"
            />
        </div>

        <div class="px-6 max-w-[800px] mx-auto" :class="!readonly && 'pt-[50px]'">
            <div class="pt-8" :class="readonly && 'pt-0'">
                <!-- @input="doc.title = ($event.target as HTMLDivElement)!.textContent || ''" -->
                <div
                    class="editor-title focus-visible:outline-none text-[28px] font-bold mb-5 border-b pb-2 break-all"
                    :class="!readonly && 'cursor-text'"
                    data-placeholder="请输入标题"
                    @keydown.enter.prevent="useFocus(editorRef!, { initialValue: true })"
                    :contentEditable="!readonly"
                    @blur="doc.title = ($event.target as HTMLDivElement)!.textContent || ''"
                    :textContent="doc.title"
                />
            </div>
            <div class="mt-3" ref="editorRef"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import 'aomao/style/base.scss';
</style>
