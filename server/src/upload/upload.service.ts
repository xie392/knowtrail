import { Injectable } from '@nestjs/common'
// import { InjectEntityManager } from '@nestjs/typeorm'
import { createWriteStream } from 'fs'
import { join } from 'path'
import { ResultData } from 'src/common/utils/result'
// import { EntityManager } from 'typeorm'

// 存放图片的地址
function reslovePath(path: string) {
    return join(__dirname, '../../../upload', path)
}

// 随机生成文件名
function randomName(fileName: string) {
    return (
        Math.random().toString(36).substring(2) + '-' + Date.now() + '.' + fileName.split('.').pop()
    )
}

@Injectable()
export class UploadService {
    // constructor(
    //     @InjectEntityManager()
    //     private readonly userManager: EntityManager
    // ) {}

    /**
     * 上传文件
     * @param {Express.Multer.File} file 文件
     */
    async uploadFile(file: Express.Multer.File) {
        try {
            // 文件命名
            const filename = randomName(file.originalname)
            // 以流的形式写入文件
            const writeStream = createWriteStream(reslovePath(filename))
            // 写入文件
            writeStream.write(file.buffer)
            // 返回文件地址
            return ResultData.ok({ url: `/${filename}` })
        } catch (err) {
            return ResultData.fail(500, '上传失败')
        }
    }

    /**
     * 上传图片
     * @param {Express.Multer.File} file 图片
     * @returns
     */
    async uploadImage(file: Express.Multer.File) {
        try {
            if (!file) {
                return ResultData.fail(400, '请上传图片格式为jpg|jpeg|png|gif的文件')
            }
            // 文件命名
            const filename = randomName(file.originalname)
            // 以流的形式写入文件
            const writeStream = createWriteStream(reslovePath(filename))
            // 写入文件
            writeStream.write(file.buffer)
            // 返回文件地址
            return ResultData.ok({ url: `/${filename}` })
        } catch (err) {
            return ResultData.fail(500, '上传失败')
        }
    }
}
