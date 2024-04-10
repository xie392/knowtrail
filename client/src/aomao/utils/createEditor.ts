import Engine, { type EngineInterface, $, type EngineOptions, View, type ViewOptions } from '@aomao/engine'
import { defaultPlugins, defaultCards, configs } from 'aomao/config'

const engineOptions: EngineOptions = {
    plugins: defaultPlugins,
    cards: defaultCards,
    config: configs,
    className: 'editor',
    placeholder: '请输入内容',
    autoAppend: true
}

/**
 * 创建一个编辑器实例
 *
 * @param container - 容器元素
 * @param options - 引擎选项
 * @returns 引擎接口实例
 */
export function createEditor(container: HTMLElement, options: EngineOptions): EngineInterface | null {
    if (!container) return null

    const engine = new Engine(container, { ...engineOptions, ...options })

    //卡片最大化时设置编辑页面样式
    engine.on('card:maximize', () => {
        $('.editor-toolbar').css('z-index', '9999').css('top', '55px')
    })

    //卡片最小化时设置编辑页面样式
    engine.on('card:minimize', () => {
        $('.editor-toolbar').css('z-index', '').css('top', '')
    })

    return engine
}

/**
 * 创建一个阅读编辑器实例
 *
 * @param container - 容器元素
 * @param options - 引擎选项
 * @returns 引擎接口实例
 */
export function createViewEditor(container: HTMLElement, options: ViewOptions): View | null {
    if (!container) return null
    const engine = new View(container, { ...engineOptions, ...options })
    return engine
}
