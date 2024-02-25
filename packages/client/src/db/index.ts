import Dexie, { type Table } from 'dexie'
import type { DOC } from './type'
import { ID, DATA_BASE_NAME } from '@/utils/constants'
import { dbImpl } from './dbImpl'
import { useUserStore } from '@/stores/user'
import { getCookie } from '@/utils/cookies'

/**
 ** 注意: 该数据库字段可以随意添加或者删除,这里只给出一些基础的字段,需要的请自行添加,无需更改以下字段
 */
class UseDBImpl extends Dexie {
    doc!: Table<DOC>

    constructor(name: string, version: number = 1) {
        super(name)

        const user = useUserStore()

        console.log('user', user)

        this.version(version).stores({
            doc: '&id, pid, title, content, create_time, update_time'
        })
    }
}

const UserDBStore = new dbImpl({
    db: new UseDBImpl(DATA_BASE_NAME + getCookie(ID) + '__')
})

export default UserDBStore
