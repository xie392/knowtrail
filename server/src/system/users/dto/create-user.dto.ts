import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator'

export class CreateUserDto {
    @ApiProperty({ description: '邮箱', required: false })
    @IsString({ message: 'email 类型错误，正确类型 string' })
    @IsEmail()
    @IsOptional()
    readonly account: string

    @ApiProperty({ description: '密码' })
    @IsString({ message: 'password 类型错误，正确类型 string' })
    @IsNotEmpty({ message: 'password 不能为空' })
    password: string

    @ApiProperty({ description: '确认密码' })
    @IsString({ message: ' confirmPassword 类型错误，正确类型 string' })
    readonly confirmPassword: string
}
