import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class LoginUserDto {
    @ApiProperty({ description: '用户账号' })
    @IsString({ message: 'account 类型错误，正确类型 string' })
    @IsNotEmpty({ message: '账号不能为空' })
    readonly account: string

    @ApiProperty({ description: '密码' })
    @IsString({ message: 'password 类型错误，正确类型 string' })
    @IsNotEmpty({ message: 'password 不能为空' })
    readonly password: string
}
