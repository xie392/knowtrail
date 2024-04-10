import {
    $,
    Plugin,
    type NodeInterface,
    CARD_KEY,
    isEngine,
    type SchemaInterface,
    type PluginOptions,
    decodeCardValue,
    CARD_VALUE_KEY,
    Parser,
    unescape,
    CARD_TYPE_KEY,
    READY_CARD_KEY,
    VIEW_CLASS_NAME,
    type SchemaBlock
} from '@aomao/engine'
import type MarkdownIt from 'markdown-it'

import CodeBlockComponent, { type CodeBlockValue } from './core'

const DATA_SYNTAX = 'data-syntax'
const DATA_THEME = 'data-theme'
const DATA_CODE = 'data-code'
const DATA_AUTO_WRAP = 'data-auto-wrap'
const PARSE_HTML = 'parse:html'
const PASTE_SCHEMA = 'paste:schema'
const PASTE_EACH = 'paste:each'
const MARKDOWN_IT = 'markdown-it'

interface synatxMapInterface {
    mode?: string
    theme?: string
    code?: string
    autoWrap?: boolean
    type?: string
    id?: string
}

export interface Options extends PluginOptions {
    hotkey?: string | Array<string>
}

export default class extends Plugin<Options> {
    // 获取卡片名字
    static get pluginName() {
        return 'codeblock'
    }

    // 插件初始化
    init() {
        // 粘贴代码块
        this.editor.on(PARSE_HTML, this.parseHtml)
        // 粘贴规则
        this.editor.on(PASTE_SCHEMA, this.pasteSchema)
        // 粘贴事件
        this.editor.on(PASTE_EACH, this.pasteHtml)

        if (isEngine(this.editor)) {
            // 监听 markdown-it 事件
            this.editor.on(MARKDOWN_IT, this.markdownIt)
        }
    }
    // 执行方法
    execute() {
        if (!isEngine(this.editor)) return
        const { card } = this.editor
        // 插入卡片
        card.insert(CodeBlockComponent.cardName)
    }

    hotkey() {
        return this.options.hotkey || ''
    }

    markdownIt = (mardown: MarkdownIt) => {
        if (this.options.markdown !== false) {
            mardown.enable('code')
            mardown.enable('fence')
        }
    }

    // 粘贴规则
    pasteSchema = (schema: SchemaInterface) => {
        schema.add([
            {
                type: 'block',
                name: 'pre',
                attributes: {
                    [DATA_SYNTAX]: '*',
                    class: '*',
                    [DATA_THEME]: '*',
                    [DATA_CODE]: '*',
                    [DATA_AUTO_WRAP]: '*',
                    language: '*',
                    'auto-wrap': '*',
                    code: '*'
                }
            },
            {
                type: 'block',
                name: 'code',
                attributes: {
                    [DATA_SYNTAX]: {
                        required: true,
                        value: '*'
                    },
                    'auto-wrap': '*'
                }
            },
            {
                type: 'block',
                name: 'code',
                attributes: {
                    language: {
                        required: true,
                        value: '*'
                    }
                }
            },
            {
                type: 'block',
                name: 'code',
                attributes: {
                    class: {
                        required: true,
                        value: (val) => {
                            return val.includes('language')
                        }
                    }
                },
                allowIn: ['pre', '$root']
            } as SchemaBlock
        ])
    }

    // 粘贴 HTML 解析
    pasteHtml = (node: NodeInterface) => {
        const editor = this.editor

        if (!isEngine(editor) || node.isText()) return

        // console.log('解析 HTML', node.get<HTMLElement>())

        // 判断是否是代码块
        if (node.get<HTMLElement>()?.hasAttribute(DATA_SYNTAX) || node.name === 'pre') {
            // 获取语法
            let syntax: string | undefined = node.attributes(DATA_SYNTAX)

            if (!syntax) {
                const getSyntaxForClass = (node: NodeInterface) => {
                    const classList = node?.get<HTMLElement>()?.classList
                    if (!classList) return
                    for (let i = 0; i < classList.length; i++) {
                        const className = classList.item(i)
                        if (className && className.startsWith('language-')) {
                            const classArray = className.split('-')
                            classArray.shift()
                            return classArray.join('-')
                        }
                    }
                    return undefined
                }

                if (node.name === 'pre') {
                    syntax = node.attributes('language')
                    if (!syntax) {
                        syntax = getSyntaxForClass(node)
                    }
                }

                const code = node.find('code')
                if (!syntax && code.length > 0) {
                    syntax = code.attributes(DATA_SYNTAX) || code.attributes('language')
                    if (!syntax) {
                        syntax = getSyntaxForClass(code)
                    }
                }
            }

            // 获取代码
            let code = new Parser(node, editor).toText(undefined, undefined, false)

            // 转义
            code = unescape(code.replace(/\u200b/g, ''))

            // 去除换行
            if (code.endsWith('\n')) {
                code = code.slice(0, -1)
            }

            // 替换节点
            editor.card.replaceNode<CodeBlockValue>(node, 'codeblock', {
                mode: syntax || 'plain',
                code,
                autoWrap: node.attributes('data-auto-wrap') === 'true',
                theme: node.attributes('data-theme') || 'monokai',
                isFocus: false
            })
            node.remove()
            return false
        }
        return true
    }

    // 复制
    parseHtml = (root: NodeInterface, callback?: (node: NodeInterface, value: CodeBlockValue) => NodeInterface) => {
        const editor = this.editor
        const results: NodeInterface[] = []
        const synatxMap: synatxMapInterface = {}
        CodeBlockComponent.getModes().forEach((item) => {
            // @ts-ignore
            synatxMap[item.value] = item.syntax
        })

        // @ts-ignore
        // const value = root['0']?.dataset?.cardValue || ''

        const codeEditor = new CodeBlockComponent({ editor, value: {}, root })

        // console.log('获取到卡片值', value, decodeCardValue(value),root['0'])

        // 容器类名
        const contentClassName = 'data-codeblock-con'

        // 获取代码块
        const content = root.find(`#${CodeBlockComponent.id}`)

        // 添加类名
        content.addClass(VIEW_CLASS_NAME)

        root.find(
            `[${CARD_KEY}="${CodeBlockComponent.cardName}"],[${READY_CARD_KEY}="${CodeBlockComponent.cardName}"]`
        ).each((cardNode) => {
            const node = $(cardNode)
            const card = editor.card.find(node) as CodeBlockComponent<CodeBlockValue>
            const value = card?.getValue() || decodeCardValue(node.attributes(CARD_VALUE_KEY))
            if (value) {
                node.empty()
                content.empty()
                // 更新属性
                codeEditor.customCreate({
                    mode: value?.mode || 'plain',
                    theme: value?.theme || 'monokai',
                    autoWrap: value?.autoWrap || false,
                    code: value?.code || ''
                })
                // 复制的内容
                const newContent = codeEditor.parseHtml(value).clone(true)
                node.append(newContent)
                node.removeAttributes(CARD_KEY)
                node.removeAttributes(CARD_TYPE_KEY)
                node.removeAttributes(CARD_VALUE_KEY)
                newContent.removeClass(VIEW_CLASS_NAME).removeClass(contentClassName)

                let newNode = node
                if (callback) {
                    newNode = callback(node, value)
                    node.replaceWith(newNode)
                }
                results.push(newNode)
            } else node.remove()
        })
        return results
    }
}
export { CodeBlockComponent }
