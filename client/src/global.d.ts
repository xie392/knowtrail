import EditorJS from '@editorjs/editorjs'

declare global {
    interface Window {
        __EDITOR__: EditorJS
    }

    interface Response<T = any> {
        code: number
        data: T
        msg: string
    }
}
