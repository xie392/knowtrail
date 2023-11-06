import Attaches from '@editorjs/attaches'
import Header from '@editorjs/header'
// import SimpleImage from '@editorjs/simple-image'
import NestedList from '@editorjs/nested-list'
import Checklist from '@editorjs/checklist'
import Quote from '@editorjs/quote'
import Warning from '@editorjs/warning'
import Marker from '@editorjs/marker'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import LinkTool from '@editorjs/link'
import Table from '@editorjs/table'
import Embed from '@editorjs/embed'
import LinkAutocomplete from '@editorjs/link-autocomplete'
import Underline from '@editorjs/underline'
import Image from '@editorjs/image'
import RawTool from '@editorjs/raw'

export const tools = {
    header: {
        class: Header,
        inlineToolbar: ['marker', 'link'],
        config: {
            placeholder: '请输入标题...',
            defaultLevel: 1
        },
        shortcut: 'CMD+SHIFT+H'
    },

    attaches: Attaches,

    // image: {
    //     class: SimpleImage,
    //     shortcut: 'CMD+SHIFT+L'
    // },
    image: {
        class: Image,
        config: {
            endpoints: {
                byFile: 'http://localhost:8008/uploadFile', // 您的后端文件上传端点
                byUrl: 'http://localhost:8008/fetchUrl' // 您的端点提供通过Url上传的功能
            }
        }
    },

    list: {
        class: NestedList,
        inlineToolbar: true,
        shortcut: 'CMD+SHIFT+L'
    },

    checklist: {
        class: Checklist,
        inlineToolbar: true
    },

    quote: {
        class: Quote,
        inlineToolbar: true,
        config: {
            quotePlaceholder: 'Enter a quote',
            captionPlaceholder: "Quote's author"
        },
        shortcut: 'CMD+SHIFT+O'
    },

    warning: Warning,

    marker: {
        class: Marker,
        shortcut: 'CMD+SHIFT+M'
    },

    // code: {
    //     class: CodeTool,
    //     shortcut: 'CMD+SHIFT+C'
    // },

    delimiter: Delimiter,

    inlineCode: {
        class: InlineCode,
        shortcut: 'CMD+SHIFT+C'
    },

    linkTool: LinkTool,

    raw: RawTool,

    embed: Embed,
    table: {
        class: Table,
        inlineToolbar: true,
        shortcut: 'CMD+ALT+T'
    },
    underline: Underline
}
