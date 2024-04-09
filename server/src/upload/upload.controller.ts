import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { UploadService } from './upload.service'
import { ResultData } from 'src/common/utils/result'
import { FileInterceptor } from '@nestjs/platform-express'

@ApiTags('上传文件')
@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) {}

    @Post('file')
    @ApiOperation({ summary: '上传文件' })
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<ResultData> {
        return await this.uploadService.uploadFile(file)
    }

    @Post('image')
    @ApiOperation({ summary: '上传图片' })
    @UseInterceptors(
        FileInterceptor('file', {
            fileFilter: (req, file, cb) => {
                if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
                    return cb(null, false)
                }
                cb(null, true)
            }
        })
    )
    async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<ResultData> {
        return this.uploadService.uploadImage(file)
    }
}
