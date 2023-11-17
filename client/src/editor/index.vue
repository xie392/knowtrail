<script setup lang="ts">
import EditorJS from '@editorjs/editorjs'
import { onMounted, ref } from 'vue'
// import { usePlaceholder } from '@/hooks/usePlaceholder'
import { lang, tools } from './config'

const editorRef = ref<HTMLElement | null>(null)
const maxWidth = ref<string>('900px')
const editor = ref<EditorJS | null>(null)

onMounted(() => {
    if (!editorRef.value) return

    // maxWidth.value = editorRef.value.offsetWidth - 100 + 'px'

    editor.value = new EditorJS({
        readOnly: false,
        i18n: lang,
        holder: 'editor',
        tools,
        // placeholder: usePlaceholder()
    })
    window.__EDITOR__ = editor.value
})

defineExpose({ editor })
</script>

<template>
    <div class="w-full">
        <div id="editor" class="editor w-full" ref="editorRef"></div>
    </div>
</template>

<style scoped lang="scss">
::v-deep(.ce-block__content) {
    max-width: v-bind('maxWidth');
    font-size: 0.95rem;

    .cdx-block {
        padding: 0.3em 0;
        font-size: inherit;
    }

    .ce-header {
        padding: 0.5rem 0 1rem;
    }
}

::v-deep(.ce-toolbar__actions) {
    right: calc(100% + calc(v-bind('maxWidth') - 650px) / 2);
}

::v-deep(.editor) {
    :where(h1, h2, h3, h4, h5, h6) {
        margin-top: 0;
        padding-bottom: 30px;
        box-sizing: border-box;
        font-weight: 600;
        line-height: 1.25;
    }

    $font-sizes: (32px, 24px, 20px, 16px, 14px, 12px);
    @for $i from 1 through 6 {
        h#{$i} {
            font-size: nth($font-sizes, $i);
        }
    }
}
</style>
