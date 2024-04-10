import { createApp } from 'vue'
import ThemeSelect from './index.vue'
import type { ThemeOptionsInterface } from '../types'

export { ThemeSelect }

/**
 * 主题切换
 * @param container
 * @param options
 */
export default (container: HTMLElement, options: ThemeOptionsInterface) => {
    const vm = createApp(ThemeSelect, {
        ...options,
        getContainer: container ? () => container : undefined
    })
    vm.mount(container)
    return vm
}
