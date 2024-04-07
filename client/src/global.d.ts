import EditorJS from '@editorjs/editorjs'

declare global {
    interface Window {
        __EDITOR__: EditorJS
    }

    interface DataResponse<T = any> {
        code: number
        data: T
        msg: string
    }
}
