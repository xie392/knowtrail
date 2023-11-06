import EditorJS from '@editorjs/editorjs'

// declare namespace Global {
//     interface Response<T = any> {
//         code: number
//         data: T
//         msg: string
//     }
// }

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
