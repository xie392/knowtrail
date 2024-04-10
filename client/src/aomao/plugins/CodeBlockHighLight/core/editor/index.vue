<template>
    <div class="code-editor">
        <codemirror
            v-model:value="code"
            :options="options"
            ref="cmRef"
            @ready="onReady"
            @input="save"
            @optionChange="save"
        />
    </div>
</template>

<script setup lang="ts">
import Codemirror from 'codemirror-editor-vue3'
import type { CmComponentRef } from 'codemirror-editor-vue3'
import type { Editor, EditorConfiguration } from 'codemirror'
import { isEngine, type EngineInterface } from '@aomao/engine'
import modeDatas from '../config/lang'
import { computed, ref, watch, type Ref } from 'vue'

const props = defineProps<{
    // 编辑器实例
    editor: EngineInterface
    // 语言
    mode: Ref<string>
    // 主题
    theme: Ref<string>
    // 是否换行
    lineWrapping: Ref<boolean>
    // 代码
    code: Ref<string>
    // 是否自动聚焦
    isFocus?: Ref<boolean>
    // 保存
    onSave: (mode: string, code: string, theme: string, lineWrapping: boolean) => void
}>()

// 判断是否可编辑
const isEditable = computed<boolean>(() => {
    return isEngine(props.editor) && !props.editor.readonly
})

// 获取语法高亮
const language = (mode: string) => {
    return modeDatas.find((v) => v.value === mode)?.syntax || 'text/plain'
}

const code = ref<string>(props.code.value)
const cmRef = ref<CmComponentRef>()
const options = ref<EditorConfiguration>({
    // 自动缩进
    smartIndent: true,
    // 缩进单元格为 4 个空格
    tabSize: 2,
    //编辑器的编程语言，比如：'javascript'
    mode: language(props.mode.value),
    // 主题，使用主体需要引入相应的 css 文件
    theme: props.theme.value,
    // 高度自适应
    viewportMargin: Infinity,
    // 只读
    readOnly: !isEditable.value,
    // 是否显示行号
    showCursorWhenSelecting: true,
    // 从第一行开始
    firstLineNumber: 1,
    // 自动换行
    lineWrapping: props.lineWrapping.value
})

// 自动聚焦
const onReady = (cm: Editor) => {
    if (props.isFocus?.value && isEditable.value) {
        cm.focus()
    }
}

// 修改属性
const change = (key: keyof EditorConfiguration, value: string | number | boolean) => {
    const editor = cmRef.value?.cminstance
    if (editor) {
        editor.setOption(key, value)
    }
}

// 保存
const save = () => {
    props.onSave(props.mode.value, code.value, props.theme.value, props.lineWrapping.value)
}

watch(
    () => props.mode,
    (val) => {
        change('mode', language(val.value))
    },
    { immediate: true, deep: true }
)

watch(
    () => props.theme,
    (val) => {
        change('theme', val.value)
    },
    { immediate: true, deep: true }
)

watch(
    () => props.lineWrapping,
    (val) => {
        change('lineWrapping', val.value)
    },
    { immediate: true, deep: true }
)
</script>

<style scoped lang="scss">
.code-editor {
    width: 100%;
    height: auto;
    border-radius: 5px;
    box-sizing: border-box;
}

::v-deep(.codemirror-container) {
    box-shadow: var(--box-shodow);
    border-radius: var(--border-radius);
}

pre,
code {
    font-size: 0.88rem;
    box-sizing: border-box;
}

::v-deep(.CodeMirror) {
    height: 100%;
    font-size: 0.85rem;
    white-space: pre-wrap;
    word-wrap: break-word;
    word-break: break-all;
    box-sizing: border-box;
    border-radius: var(--border-radius);

    .CodeMirror-line {
        word-wrap: break-word;
        word-break: break-all;
    }

    .CodeMirror-hscrollbar {
        z-index: 99;
        left: 0 !important;
        bottom: -1px !important;

        &::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: #e1e1e1;
            border-radius: 4px;
        }
    }
}
</style>
