import Dexie from 'dexie'

export interface serviceOptions {
    db: Dexie
    defaultKey?: string
}

export interface DBMixin {
    findOneById(tableName: string, key: string, value: string): Promise<any>
    findOneAllById(tableName: string, key: string, value: string): Promise<any>
    findAll(tableName: string): Promise<any[]>
    add(table: string, data: any): Promise<any>
    bulkAdd(table: string, data: any[]): Promise<any>
    update(table: string, key: string, value: string, data: any): Promise<any>
    delete(table: string, key: string, value: string): Promise<number>
    clear(table: string): Promise<void>
}

export interface DOC {
    /**
     * 文档唯一标识
     */
    id: string
    /**
     * 文档标题
     */
    title: string
    /**
     * 文档父级 id
     */
    pid: string
    /**
     * 文档内容
     */
    content: string
    /**
     * 文档创建时间
     */
    create_time: number
    /**
     * 文档更新时间
     */
    update_time: number
    /**
     * 可读
     */
    readonly: boolean
    /**
     * 其他扩展内容
     */
    [key: string]: any
}
