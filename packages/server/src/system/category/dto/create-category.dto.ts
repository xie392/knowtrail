import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator'
export class CreateCategoryDto {
    @ApiProperty({ description: '知识库标题', required: true })
    @IsString({ message: 'title 类型错误，正确类型 string' })
    @IsOptional()
    readonly title: string

    @ApiProperty({ description: '知识库描述', required: true })
    @IsString({ message: 'description 类型错误，正确类型 string' })
    @IsOptional()
    readonly description: string

    @ApiProperty({ description: '知识库封面', required: false })
    @IsString({ message: 'cover 类型错误，正确类型 string' })
    @IsOptional()
    readonly cover: string

    @ApiProperty({ description: '状态 1 正常 0 私有 2需要密码', required: false })
    @IsNumber()
    @IsOptional()
    public status: number

    @ApiProperty({ type: String, description: '知识库密码，私有时可能需要', required: false })
    @IsString({ message: 'password 类型错误，正确类型 string' })
    @IsOptional()
    public password: string
}
