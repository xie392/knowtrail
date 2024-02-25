<script setup lang="ts">
import { type EngineInterface } from '@aomao/engine'
import Toolbar from '../toolbar'
import { onMounted, onUnmounted, ref, watch, watchEffect } from 'vue'
import { defaultPCToolbarItems } from 'aomao/config'
import { useFocus } from '@vueuse/core'
import { debounce } from '@/utils/utils'
import { createEditor } from 'aomao/utils/createEditor'
// import { docSubject } from '@/state/doc'
import { useDocStore } from '@/stores/doc'
import { storeToRefs } from 'pinia'
// import { useRoute } from 'vue-router'

interface EditorProps {
    toolbarClassName?: string
}

const { doc, readonly, is_cretaed, is_updated } = storeToRefs(useDocStore())
const props = withDefaults(defineProps<EditorProps>(), {})

const editor = ref<EngineInterface | null>()
const editorRef = ref<HTMLDivElement | null>(null)
const titleRef = ref<HTMLDivElement | null>(null)

const init = () => {
    if (!editorRef.value) return

    const engine = createEditor(editorRef.value, {
        readonly: readonly.value,
        placeholder: readonly.value ? '' : '请输入内容'
    })
    if (!engine) return

    engine.setValue(doc.value.content)

    engine.on('change', () => {
        const fn = debounce(() => {
            doc.value.content = engine.model.toValue()
        }, 1000)
        fn()
    })

    editor.value = engine
}

const saveTitle = async (e: FocusEvent) => {
    const title = (e.target as HTMLDivElement)!.textContent as string
    doc.value.title = title
}

// const route = useRoute()

watch(
    () => doc.value,
    () => {
        if (is_updated) {
            editor.value?.setValue(doc.value.content)
            titleRef.value!.textContent = doc.value.title
            if (is_cretaed.value) {
                editor.value!.readonly = false
                is_cretaed.value = false
            }
            is_updated.value = false
        }
    },
)

watchEffect(() => {
    if (!editor.value) return
    editor.value.readonly = readonly.value ?? true
})

// const stopWatching = watch(doc, () => {
//     doc.value?.content && editor.value!.setValue(doc.value?.content ?? '')
//     stopWatching()
// })

onMounted(() => {
    init()
})
onUnmounted(() => editor.value!.destroy())
</script>

<template>
    <div class="w-full pb-10">
        <div
            class="w-full fixed z-10 flex items-center px-3 bg-bgPrimary justify-center min-h-[40px] border-b border-gray-200"
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
                <div
                    class="editor-title focus-visible:outline-none text-[28px] font-bold mb-5 border-b pb-2 break-all"
                    :class="!readonly && 'cursor-text'"
                    data-placeholder="未命名文档"
                    @keydown.enter.prevent="useFocus(editorRef!, { initialValue: true })"
                    :contentEditable="!readonly"
                    @blur="saveTitle"
                    :textContent="doc.title"
                    ref="titleRef"
                />
            </div>
            <div class="mt-3" ref="editorRef"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import 'aomao/style/base.scss';
</style>
