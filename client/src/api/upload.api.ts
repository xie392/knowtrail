import request from '@/utils/request'

/**
 * 用户管理接口集合类
 */
export class UploadService {
    private static readonly http: typeof request = request

    /**
     * 上传文件
     * @param {File} file 文件
     */
    static uploadFileApi(file: File): Promise<DataResponse> {
        const formData = new FormData()
        formData.append('file', file)
        return this.http({
            url: '/upload/file',
            method: 'post',
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    }

    /**
     * 上传图片
     * @param {File} file 文件
     */
    static uploadImageApi(file: File): Promise<DataResponse> {
        const formData = new FormData()
        formData.append('file', file)
        return this.http({
            url: '/upload/image',
            method: 'post',
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    }
}
