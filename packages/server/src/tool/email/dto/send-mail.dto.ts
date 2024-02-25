import { ApiProperty } from '@nestjs/swagger'

export class SednMailDto {
    @ApiProperty({ description: '邮箱' })
    email: string

    @ApiProperty({ description: 'title 提示' })
    subject?: string

    @ApiProperty({ description: '右下角提示' })
    sign?: string

    @ApiProperty({ description: '验证码' })
    captcha: string
}
