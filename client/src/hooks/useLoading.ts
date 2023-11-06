import { createVNode, render } from 'vue'
import type { VNode } from 'vue'
import Loading from '@/components/loading/index.vue'

export const useLoading = (visable: boolean = true) => {
    const vnode: VNode = createVNode(Loading)
    render(vnode, document.body)

    const show = vnode.component?.exposed?.show
    const hide = vnode.component?.exposed?.hide

    visable ? show() : hide()
}
