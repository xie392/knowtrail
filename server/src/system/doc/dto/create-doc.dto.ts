import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator'

export class CreateDocDto {
    @ApiProperty({ description: '文档标题', required: false })
    @IsString({ message: 'title 类型错误，正确类型 string' })
    @IsOptional()
    readonly title?: string

    @ApiProperty({ description: '文档内容', required: false })
    @IsString({ message: 'content 类型错误，正确类型 string' })
    @IsOptional()
    readonly content?: string

    @ApiProperty({ description: '文档封面', required: false })
    @IsString({ message: 'cover 类型错误，正确类型 string' })
    @IsOptional()
    readonly cover?: string

    @ApiProperty({ description: '标签', required: false })
    @IsString({ message: 'tag_type 类型错误，正确类型 string' })
    @IsOptional()
    readonly tag_type?: string

    @ApiProperty({ description: '知识库id', required: false })
    @IsString({ message: 'pid 类型错误，正确类型 string' })
    @IsOptional()
    readonly pid?: string

}
