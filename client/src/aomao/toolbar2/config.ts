import type { IconName } from './components/ui/icon/index'
import type { EngineInterface } from '@aomao/engine'

export enum ItemType {
    BUTTON = 'button',
    SELECT = 'select',
    POPUP = 'popup'
}

export interface Item {
    name: IconName | string
    type: ItemType
    title: string
    command: (engine: EngineInterface, value?: string) => void
    options?: Array<{ name: string; value: string }>
    defaultValue?: string
}

export const Items: Item[][] = [
    [
        {
            name: 'bold',
            type: ItemType.BUTTON,
            title: '加粗',
            command: (engine) => engine?.command.execute('bold')
        },
        {
            name: 'italic',
            type: ItemType.BUTTON,
            title: '斜体',
            command: (engine) => engine?.command.execute('italic')
        },
        {
            name: 'underline',
            type: ItemType.BUTTON,
            title: '下划线',
            command: (engine) => engine?.command.execute('underline')
        },
        {
            name: 'strikethrough',
            type: ItemType.BUTTON,
            title: '删除线',
            command: (engine) => engine?.command.execute('strikethrough')
        }
    ],
    [
        {
            name: 'heading',
            type: ItemType.SELECT,
            title: '标题',
            command: (engine, value?: string) => engine?.command.execute('heading', value),
            defaultValue: '正文',
            options: [
                { name: '正文', value: 'p' },
                { name: '标题一', value: 'h1' },
                { name: '标题二', value: 'h2' },
                { name: '标题三', value: 'h3' },
                { name: '标题四', value: 'h4' },
                { name: '标题五', value: 'h5' },
                { name: '标题六', value: 'h6' }
            ]
        },
        {
            name: 'fontsize',
            type: ItemType.SELECT,
            title: '字号',
            command: (engine, value?: string) => engine?.command.execute('fontsize', value),
            defaultValue: '默认',
            options: [
                { name: '默认', value: '14px' },
                { name: '12px', value: '12px' },
                { name: '14px', value: '14px' },
                { name: '16px', value: '16px' },
                { name: '18px', value: '18px' },
                { name: '20px', value: '20px' },
                { name: '22px', value: '22px' },
                { name: '24px', value: '24px' },
                { name: '26px', value: '26px' },
                { name: '28px', value: '28px' },
                { name: '30px', value: '30px' },
                { name: '32px', value: '32px' },
                { name: '34px', value: '34px' },
                { name: '36px', value: '36px' },
                { name: '40px', value: '40px' },
                { name: '48px', value: '48px' }
            ]
        }
    ]
]
