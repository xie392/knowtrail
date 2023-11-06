<script setup lang="ts">
import Engine, { type EngineInterface } from '@aomao/engine'
import Toolbar from '../toolbar'
// import Toolbar from '@aomao/toolbar-vue'
// import Toolbar from '../toolbar2'
import { onMounted, onUnmounted, ref } from 'vue'
import { defaultPlugins, defaultCards, defaultPCToolbarItems, configs } from 'aomao/config'
import { useFocus } from '@vueuse/core'

interface EditorProps {
    toolbar?: boolean
    readonly?: boolean
    toolbarClassName?: string
}
const props = withDefaults(defineProps<EditorProps>(), {
    toolbar: true,
    readonly: false
})

const editor = ref<EngineInterface | null>(null)
const editorRef = ref<HTMLDivElement | null>(null)
const titleRef = ref<HTMLDivElement | null>(null)

onMounted(() => {
    if (!editorRef.value) return
    const engine = new Engine(editorRef.value, {
        plugins: defaultPlugins,
        cards: defaultCards,
        config: configs,
        className: 'editor',
        placeholder: '请输入内容',
        autoAppend: true,
        readonly: props.readonly
    })
    editor.value = engine
})

onUnmounted(() => {
    editor.value!.destroy()
})
</script>

<template>
    <div class="w-full pb-10">
        <div
            class="w-full fixed z-50 flex items-center px-3 bg-bgPrimary justify-center min-h-[40px] border-b border-gray-200"
            v-if="props.toolbar && !props.readonly"
            :class="props.toolbarClassName"
        >
            <Toolbar
                v-if="editor"
                :engine="editor as EngineInterface"
                :items="defaultPCToolbarItems"
            />
        </div>

        <div class="px-6 max-w-[800px] mx-auto" :class="props.toolbar && 'pt-[50px]'">
            <div class="pt-8" :class="props.readonly && 'pt-0'">
                <div
                    class="editor-title focus-visible:outline-none text-[28px] font-bold mb-5 border-b pb-2 break-all"
                    :class="!props.readonly && 'cursor-text'"
                    data-placeholder="请输入标题"
                    ref="titleRef"
                    @keydown.enter.prevent="useFocus(editorRef!, { initialValue: true })"
                    :contentEditable="!props.readonly"
                ></div>
            </div>
            <div class="mt-3" ref="editorRef"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import 'aomao/style/base.scss';
</style>
