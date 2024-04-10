import { createApp } from 'vue'
import ModeSelect from './index.vue'
import type { ModeOptionsInterface } from '../types'

export { ModeSelect }

/**
 * 语言切换
 * @param container
 * @param options
 */
export default (container: HTMLElement, options: ModeOptionsInterface) => {
    const vm = createApp(ModeSelect, {
        ...options,
        getContainer: container ? () => container : undefined
    })
    vm.mount(container)
    return vm
}
