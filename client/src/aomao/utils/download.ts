import { joinUrl } from '@/utils/utils'

export function download(): void {
    const fileEls = document.querySelectorAll('[data-card-key="file"]')
    fileEls.forEach((el) => {
        // 解码
        const fileId = el.getAttribute('data-card-value')
        if (!fileId) return
        const data = decodeURIComponent(fileId).split('data:')?.[1]
        // url 解码
        const url = JSON.parse(data)?.url ?? ''
        if (!url) return
        const fileEl = el.querySelector('a')
        if (!fileEl) return
        fileEl.setAttribute('href', joinUrl(url))
        fileEl.setAttribute('target', '_blank')
        fileEl.setAttribute('download', url.split('/').pop() ?? '')
    })
}
