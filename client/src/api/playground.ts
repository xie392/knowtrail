import request from '@/utils/request'

export function getNotesApi(params?: any): Promise<Response> {
    return request({
        url: '/explore/recommend/notes',
        method: 'get',
        params
    })
}
