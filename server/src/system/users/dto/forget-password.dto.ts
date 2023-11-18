import { ApiProperty } from '@nestjs/swagger'

export class ForgetPasswordDto {
    @ApiProperty({ description: '邮箱' })
    readonly account: string

    @ApiProperty({ description: '新密码' })
    readonly password: string

    @ApiProperty({ description: '确认新密码' })
    readonly confirmPassword: string

    @ApiProperty({ description: '验证码' })
    readonly captcha: string
}
