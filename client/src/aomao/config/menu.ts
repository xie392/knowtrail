import type { GroupItemProps } from '@aomao/toolbar-vue'

export const defaultPCToolbarItems: GroupItemProps[] = [
    ['collapse'],
    ['undo', 'redo', 'paintformat', 'removeformat'],
    ['heading', 'fontfamily', 'fontsize'],
    ['bold', 'italic', 'strikethrough', 'underline', 'moremark'],
    ['fontcolor', 'backcolor'],
    ['alignment'],
    ['unorderedlist', 'orderedlist', 'tasklist', 'indent', 'line-height'],
    ['link', 'quote', 'hr']
]
