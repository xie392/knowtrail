import type { DOC } from '@/db/type'
import { BehaviorSubject } from 'rxjs'

export const docSubject = new BehaviorSubject<DOC>({
    id: '',
    title: '',
    content: '',
    readonly: true,
    pid: '',
    create_time: 0,
    update_time: 0
})

export const docListSubject = new BehaviorSubject<DOC[]>([])

