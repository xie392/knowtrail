import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator'

export class CreateDocDto {
    @ApiProperty({ description: '文档标题', required: false })
    @IsString({ message: 'title 类型错误，正确类型 string' })
    @IsOptional()
    title: string

    @ApiProperty({ description: '文档内容', required: false })
    @IsString({ message: 'content 类型错误，正确类型 string' })
    @IsOptional()
    content: string

    @ApiProperty({ description: '文档封面', required: false })
    @IsString({ message: 'cover 类型错误，正确类型 string' })
    @IsOptional()
    cover: string

    @ApiProperty({ description: '文档状态', required: false })
    @IsNumber(
        { allowNaN: false, allowInfinity: false },
        { message: 'status 类型错误，正确类型 number' }
    )
    @IsOptional()
    status: number

    @ApiProperty({ description: '标签', required: false })
    @IsString({ message: 'tag_type 类型错误，正确类型 string' })
    @IsOptional()
    tag_type: string
}
