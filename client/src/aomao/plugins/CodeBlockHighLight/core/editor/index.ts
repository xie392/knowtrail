import { createApp } from 'vue'
import Editor from './index.vue'
import type { EditorOptionsInterface } from '../types'

export { Editor }

/**
 * 创建编辑器
 * @param container 挂载容器
 * @param options 配置
 */
export default (container: HTMLElement, options: EditorOptionsInterface) => {
    const vm = createApp(Editor, { ...options })
    vm.mount(container)
    return vm
}
