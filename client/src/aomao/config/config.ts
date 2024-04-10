import { type PluginOptions } from '@aomao/engine'
import Fontsize from '@aomao/plugin-fontsize'
import Math from '@aomao/plugin-math'
import Fontfamily from '@aomao/plugin-fontfamily'
import LineHeight from '@aomao/plugin-line-height'
import Mention from '@aomao/plugin-mention'
import { ToolbarPlugin, fontFamilyDefaultData } from 'aomao/toolbar'
import Image, { ImageUploader } from '@aomao/plugin-image'
import { BASE_URL } from '@/utils/constants'
import { useLogin } from '@/hooks/useLogin'
import { joinUrl } from '@/utils/utils'
import File, { FileUploader } from '@aomao/plugin-file'

const { user } = useLogin()

export const configs: { [key: string]: PluginOptions } = {
    // [ToolbarPlugin.pluginName]: {
    //     config: [
    //         {
    //             items: ['image-uploader', 'codeblock', 'table', 'math', 'status']
    //         }
    //     ]
    // },
    // [MarkRange.pluginName]: {
    //     //标记类型集合
    //     keys: ['mark'],
    //     //标记数据更新后触发
    //     onChange: (
    //         addIds: { [key: string]: Array<string> },
    //         removeIds: { [key: string]: Array<string> }
    //     ) => {
    //         // 新增的标记
    //         addIds['comment'] || []
    //         // 删除的标记
    //         removeIds['comment'] || []

    //         // 新增的标记
    //     },
    //     //光标改变时触发
    //     onSelect: (range: RangeInterface, selectInfo?: { key: string; id: string }) => {
    //         const { key, id } = selectInfo || {}
    //         // 移除预览标记
    //         engine?.command.executeMethod('mark-range', 'action', 'comment', 'revoke')
    //         if (key === 'mark' && id) {
    //             engine?.command.executeMethod('mark-range', 'action', key, 'preview', id)
    //         }
    //     }
    // },
    [Math.pluginName]: {
        action: `https://g.yanmao.cc/latex`,
        parse: (res: any) => {
            if (res.success) return { result: true, data: res.svg }
            return { result: false }
        }
    },
    // [Mention.pluginName]: {
    //     action: `${DOMAIN}/user/search`,
    //     onLoading: (root: NodeInterface) => {
    //         const vm = createApp(Loading)
    //         vm.mount(root.get<HTMLElement>()!)
    //     },
    //     onEmpty: (root: NodeInterface) => {
    //         const vm = createApp(Empty)
    //         vm.mount(root.get<HTMLElement>()!)
    //     },
    //     onClick: (root: NodeInterface, { key, name }: { key: string; name: string }) => {
    //         console.log('mention click:', key, '-', name)
    //     },
    //     onMouseEnter: (layout: NodeInterface, { name }: { key: string; name: string }) => {
    //         const vm = createApp(MentionPopover, {
    //             name
    //         })
    //         vm.mount(layout.get<HTMLElement>()!)
    //     }
    // },
    [Fontsize.pluginName]: {
        //配置粘贴后需要过滤的字体大小
        filter: (fontSize: string) => {
            return (
                [
                    '12px',
                    '13px',
                    '14px',
                    '15px',
                    '16px',
                    '19px',
                    '22px',
                    '24px',
                    '29px',
                    '32px',
                    '40px',
                    '48px'
                ].indexOf(fontSize) > -1
            )
        },
        defaultSize: '15px'
    },
    [Fontfamily.pluginName]: {
        filter: (fontfamily: string) => {
            const item = fontFamilyDefaultData.find((item) =>
                fontfamily
                    .split(',')
                    .some((name) => item.value.toLowerCase().indexOf(name.replace(/"/, '').toLowerCase()) > -1)
            )
            return item ? item.value : false
        }
    },
    [LineHeight.pluginName]: {
        //配置粘贴后需要过滤的行高
        filter: (lineHeight: string) => {
            if (lineHeight === '14px') return '1'
            if (lineHeight === '16px') return '1.15'
            if (lineHeight === '21px') return '1.5'
            if (lineHeight === '28px') return '2'
            if (lineHeight === '35px') return '2.5'
            if (lineHeight === '42px') return '3'
            // 不满足条件就移除掉
            return ['1', '1.15', '1.5', '2', '2.5', '3'].indexOf(lineHeight) > -1
        },
        //配置粘贴后需要过滤的行高
        onBeforeRender: (lineHeight: string) => {
            if (lineHeight === '1') return '14px'
            if (lineHeight === '1.15') return '16px'
            if (lineHeight === '1.5') return '21px'
            if (lineHeight === '2') return '28px'
            if (lineHeight === '2.5') return '35px'
            if (lineHeight === '3') return '42px'
            return lineHeight
        },
        defaultSize: '2'
    },
    [Image.pluginName]: {
        onBeforeRender: (_status: string, url: string) => {
            if (url.startsWith('data:image/')) return url
            return joinUrl(url)
        }
    },
    [ImageUploader.pluginName]: {
        file: {
            action: `${BASE_URL}/upload/image`,
            headers: { Authorization: user?.value?.accessToken }
        },
        remote: {
            // action: `${BASE_URL}/upload/image`
            action: `${BASE_URL}/upload/image`
        },
        isRemote: (src: string) => src.indexOf(BASE_URL) < 0
    },
    [File.pluginName]: {
        onBeforeRender: (_status: string, url: string) => {
            if (url.startsWith('data:')) return url
            return joinUrl(url)
        }
        // onDownload: (url: string) => {
        //     console.log('下载', url)
        //     window.open(url)
        // }
    },
    [FileUploader.pluginName]: {
        action: `${BASE_URL}/upload/file`,
        headers: { Authorization: user?.value?.accessToken },
        multiple: 1
        // parse: (response: any) => {
        //     return {
        //         result: response.code === 200,
        //         data: {
        //             url: response.data?.url,
        //             preview: response.data?.url,
        //             download: response.data?.url,
        //             status: response.data?.url
        //         }
        //     }
        // }
    }
}
