import Dexie, { type Table } from 'dexie'
import type { DOC } from './type'
import { ID, DATA_BASE_NAME } from '@/utils/constants'
import { dbImpl } from './dbImpl'
import { getCookie } from '@/utils/cookies'

class UseDBImpl extends Dexie {
    doc!: Table<DOC>
    docs!: Table<any>

    constructor(name: string, version: number = 1) {
        super(name)

        this.version(version).stores({
            doc: '&id, pid, title, content, create_time, update_time, category_id',
            docs: '&id, pid, title, content, create_time, update_time, category_id, user_id, doc'
        })
    }
}

const UserDBStore = new dbImpl({
    db: new UseDBImpl(DATA_BASE_NAME + getCookie(ID) + '__')
})

export default UserDBStore
