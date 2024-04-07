<script setup lang="ts">
import { type EngineInterface } from '@aomao/engine'
import { onMounted, onUnmounted, ref, watch } from 'vue'
// import { defaultPCToolbarItems } from 'aomao/config'
import { createEditor } from 'aomao/utils/createEditor'

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
        editor.value?.setValue(val)
    }
)

onMounted(() => init())
onUnmounted(() => editor.value?.destroy())
</script>

<template>
    <div ref="editorRef" />
</template>

<style scoped lang="scss">
@import 'aomao/style/base.scss';
</style>
