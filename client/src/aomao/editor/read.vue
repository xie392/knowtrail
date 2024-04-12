<script setup lang="ts">
import { type EngineInterface } from '@aomao/engine'
import { onMounted, onUnmounted, ref, watch } from 'vue'
// import { defaultPCToolbarItems } from 'aomao/config'
import { createEditor } from 'aomao/utils/createEditor'
import { download } from '../utils/download'

interface EditorProps {
    toolbarClassName?: string
    content: string
}

const props = withDefaults(defineProps<EditorProps>(), {})

const editor = ref<EngineInterface | null>()
const editorRef = ref<HTMLDivElement | null>(null)

const init = () => {
    if (!editorRef.value) return
    if (editor.value) return

    const engine = createEditor(editorRef.value, {
        readonly: true
    })
    if (!engine) return
    engine.setValue(props.content ?? '无内容')

    editor.value = engine
}

watch(
    () => props.content,
    (val) => {
        if (!editor.value) return
        editor.value.setValue(val)
        download()
    }
)

onMounted(() => init())
onUnmounted(() => editor.value?.destroy())
</script>

<template>
    <div class="w-full">
        <div class="w-full h-full">
            <div class="mt-3" ref="editorRef"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../style/base.scss';
</style>
