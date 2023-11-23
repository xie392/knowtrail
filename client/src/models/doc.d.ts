export interface Docs {
    [key: string]: any
}
export type CreateDoc = Docs

export interface DocListParams {
    page?: number
    limit?: number
}

export type DocParams = DocListParams & {
    keywords: string
}
