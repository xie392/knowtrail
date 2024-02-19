<script setup lang="ts">
import { type EngineInterface } from '@aomao/engine'
import Toolbar from '../toolbar'
import { onMounted, onUnmounted, ref, watch, watchEffect } from 'vue'
import { defaultPCToolbarItems } from 'aomao/config'
import { useFocus } from '@vueuse/core'
import { debounce } from '@/utils/utils'
import { createEditor } from 'aomao/utils/createEditor'
import { docSubject } from '@/state/doc'
import type { DOC } from '@/db/type'
import UserDBStore from '@/db'
import { liveQuery } from 'dexie'
import { useObservable } from '@vueuse/rxjs'
import { useRoute } from 'vue-router'

interface EditorProps {
    toolbarClassName?: string
}

const props = withDefaults(defineProps<EditorProps>(), {})
const editor = ref<EngineInterface | null>()
const editorRef = ref<HTMLDivElement | null>(null)

const { id } = useRoute().params as { id: string }

// @ts-ignore
const doc = useObservable<DOC>(liveQuery(() => UserDBStore.findOneById(UserDBStore.tables.doc, 'id', id)))

const updateDoc = async (options: { [key: string]: any }) => {
    doc.value &&
        (await UserDBStore.update(UserDBStore.tables.doc, 'id', id, {
            ...doc.value,
            ...options
        }))
}

const init = () => {
    if (!editorRef.value) return

    const engine = createEditor(editorRef.value, { readonly: docSubject.value.readonly })
    if (!engine) return

    engine.on('change', () => {
        const fn = debounce(() => {
            updateDoc({ content: engine.model.toValue() })
        }, 1000)
        fn()
    })

    editor.value = engine
}

const saveTitle = async (e: FocusEvent) => {
    const title = (e.target as HTMLDivElement)!.textContent
    updateDoc({ title })
}

watchEffect(() => {
    if (!editor.value) return
    editor.value.readonly = doc.value?.readonly ?? true
})

const stopWatching = watch(doc, () => {
    doc.value?.content && editor.value!.setValue(doc.value?.content ?? '')
    stopWatching()
})

onMounted(() => {
    init()
    console.log('doc', doc.value)
})
onUnmounted(() => editor.value!.destroy())
</script>

<template>
    <div class="w-full pb-10">
        <div
            class="w-full fixed z-50 flex items-center px-3 bg-bgPrimary justify-center min-h-[40px] border-b border-gray-200"
            v-if="!doc?.readonly"
            :class="props.toolbarClassName"
        >
            <Toolbar
                v-if="editor"
                :engine="editor as EngineInterface"
                :items="defaultPCToolbarItems"
                :readonly="doc?.readonly"
            />
        </div>

        <div class="px-6 max-w-[800px] mx-auto" :class="!doc?.readonly && 'pt-[50px]'">
            <div class="pt-8" :class="docSubject.value.readonly && 'pt-0'">
                <div
                    class="editor-title focus-visible:outline-none text-[28px] font-bold mb-5 border-b pb-2 break-all"
                    :class="!doc?.readonly && 'cursor-text'"
                    data-placeholder="请输入标题"
                    @keydown.enter.prevent="useFocus(editorRef!, { initialValue: true })"
                    :contentEditable="!doc?.readonly"
                    @blur="saveTitle"
                    :textContent="doc?.title"
                />
            </div>
            <div class="mt-3" ref="editorRef"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import 'aomao/style/base.scss';
</style>
