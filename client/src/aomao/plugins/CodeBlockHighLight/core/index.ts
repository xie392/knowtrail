import {
    $,
    Card,
    type CardToolbarItemOptions,
    CardType,
    isEngine,
    type NodeInterface,
    type ToolbarItemOptions,
    isServer,
    type CardValue,
    type EngineInterface
} from '@aomao/engine'
import { ref, type App, type Ref } from 'vue'
// import type { Editor } from 'codemirror'
import { SelectStyleType } from '@aomao/engine'

import CodeBlcokEditor from './editor'
import renderSelect from './mode-select'
import renderThemeSelect from './theme-select'
import modeDatas from './config/lang'
import themeDatas from './config/theme'

// 代码块
export interface CodeBlockValue extends CardValue {
    mode?: string
    theme?: string
    code?: string
    autoWrap?: boolean
    isFocus?: boolean
}

class CodeBlockComponent<V extends CodeBlockValue = CodeBlockValue> extends Card<V> {
    // 可编辑区域
    contenteditable = ['pre.CodeMirror-line']

    // 代码块 id 唯一
    static id: string = `code-${Math.random().toString(36).substring(2)}`

    // 卡片名字
    static get cardName() {
        return 'codeblock'
    }

    // 卡片类型
    static get cardType() {
        return CardType.BLOCK
    }

    // 选中时不需要任何样式
    static get selectStyleType() {
        return 'none' as SelectStyleType
    }

    // 获取所有语言
    static getModes() {
        return modeDatas
    }

    static getThemes() {
        return themeDatas
    }

    // 要挂载的容器
    container: NodeInterface | null = null
    // vue 实例
    vm?: App<Element>

    // 语言
    mode: Ref<string> = ref<string>('plain')
    // 主题
    theme: Ref<string> = ref<string>('monokai')
    // 是否换行
    lineWrapping: Ref<boolean> = ref<boolean>(false)
    // 代码
    code: Ref<string> = ref<string>('')
    // 是否自动聚焦
    isFocus: Ref<boolean> = ref<boolean>(true)

    modeNameMap: { [key: string]: string } = {}
    modeSynatxMap: { [key: string]: string } = {}

    // 渲染模板
    renderTemplate() {
        return `<div class="data-codeblock-con" id="${CodeBlockComponent.id}"></div>`
    }

    // 初始化
    init(): void {
        if (isServer) return

        super.init()

        // 语言模式
        modeDatas.forEach((item) => {
            this.modeNameMap[item.value] = item.name
            this.modeSynatxMap[item.value] = item.syntax

            if (item.alias) {
                item.alias.forEach((name) => {
                    this.modeNameMap[name] = item.name
                    this.modeSynatxMap[name] = item.syntax
                })
            }
        })
    }

    // 工具栏
    toolbar(): Array<ToolbarItemOptions | CardToolbarItemOptions> {
        const editor = this.editor
        const getItems = (): Array<CardToolbarItemOptions | ToolbarItemOptions> => {
            if (this.loading) return []
            // 阅读模式
            if (!isEngine(editor) || editor.readonly) {
                return [
                    { key: 'copy', type: 'copy' },
                    {
                        key: 'autoWrap',
                        type: 'switch',
                        content: '自动换行',
                        getState: () => {
                            return this.lineWrapping.value
                        },
                        onClick: () => {
                            this.lineWrapping.value = !this.lineWrapping.value
                        }
                    }
                ]
            }
            return [
                { key: 'dnd', type: 'dnd' },
                { key: 'copy', type: 'copy' },
                { key: 'delete', type: 'delete' },
                {
                    key: 'select',
                    type: 'node',
                    node: $('<div />'),
                    didMount: (node) => {
                        setTimeout(() => {
                            // 渲染语言选择组件
                            renderSelect(node.get<HTMLElement>()!, {
                                modeDatas,
                                defaultValue: this.mode.value || 'plain',
                                onSelect: (mode: string) => {
                                    // 切换语言
                                    setTimeout(() => {
                                        this.mode.value = mode
                                    }, 100)
                                }
                            })
                        }, 100)
                    }
                },
                {
                    key: 'select',
                    type: 'node',
                    node: $('<div />'),
                    didMount: (node) => {
                        setTimeout(() => {
                            // 渲染主题选择组件
                            renderThemeSelect(node.get<HTMLElement>()!, {
                                modeDatas: themeDatas,
                                defaultValue: this.theme.value || 'monokai',
                                onSelect: (theme: string) => {
                                    // 切换主题
                                    setTimeout(() => {
                                        this.theme.value = theme
                                    }, 100)
                                }
                            })
                        }, 100)
                    }
                },
                {
                    key: 'autoWrap',
                    type: 'switch',
                    content: '自动换行',
                    getState: () => {
                        return this.lineWrapping.value
                    },
                    onClick: () => {
                        this.lineWrapping.value = !this.lineWrapping.value
                    }
                }
            ]
        }
        const options = editor.plugin.findPlugin('codeblock')?.options
        if (options?.cardToolbars) {
            return options.cardToolbars(getItems(), this.editor)
        }
        return getItems()
    }

    /**
     * 获取当前语言名字
     * @param mode
     * @returns
     */
    getModeName(mode: string = '') {
        return this.modeNameMap[mode] || mode
    }

    /**
     * 更新属性
     * @param options
     * @param {boolean} isPaste  判断是否时粘贴
     */
    customCreate(options: CodeBlockValue) {
        const { mode, theme, code, autoWrap } = options
        console.log('this', this.theme, options)
        this.theme.value = theme || 'monokai'
        this.code.value = code || ''
        this.lineWrapping.value = autoWrap || false
        this.isFocus.value = options.isFocus || false
        this.mode.value = mode || 'plain'
    }

    /**
     * 复制时把下面内容添加到剪切板
     * @param options
     */
    parseHtml(options: CodeBlockValue) {
        this.customCreate(options)
        const stage = $(`
      <pre><code>${options.code || ''}</code></pre>
      `)
        stage.attributes('data-syntax', options.mode || 'plain')
        stage.attributes('data-theme', options.theme || 'monokai')
        stage.attributes('data-auto-wrap', options.autoWrap ? 'true' : 'false')
        stage.attributes('data-code', options.code)
        return stage
    }

    render() {
        if (!this.container) {
            this.container = $(this.renderTemplate())
        }
        return this.container
    }

    didRender() {
        super.didRender()

        const value = this.getValue()
        // 如果有值，就替换
        if (value.mode) this.customCreate(value)

        // console.log('Editor didRender', value)

        this.vm = CodeBlcokEditor(this.container?.get<HTMLElement>() as HTMLElement, {
            editor: this.editor as EngineInterface,
            mode: this.mode,
            theme: this.theme,
            lineWrapping: this.lineWrapping,
            code: this.code,
            isFocus: this.isFocus,
            onSave: this.onSave.bind(this)
        })
    }

    /**
     * 保存数据到卡片
     * @param mode  语言
     * @param code  代码
     * @param theme   主题
     * @param lineWrapping  是否自动换行
     */
    onSave(mode: string, code: string, theme: string, lineWrapping: boolean) {
        this.setValue({
            mode,
            code,
            theme,
            autoWrap: lineWrapping
        } as V)
    }

    // 销毁
    destroy() {
        super.destroy()
        this.vm?.unmount()
    }
}

export default CodeBlockComponent
