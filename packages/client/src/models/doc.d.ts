export interface Docs {
    id: string
    pid: string
    title: string
    content: string
    cover?: string
    tag_type?: string
    p_id: string
    [key: string]: any
}

export interface CreateDoc {
    title?: string
    content?: string
    cover?: string
    tag_type?: string
    pid: string
} 
 
export type UpdateDoc = {  id: string } & CreateDoc

export interface DocListParams {
    page?: number
    limit?: number
}

export type DocParams = DocListParams & {
    keywords: string
}
