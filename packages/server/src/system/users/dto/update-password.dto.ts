import { ApiProperty } from '@nestjs/swagger'

export class UpdatePasswordDto {
    @ApiProperty({ description: '新密码' })
    readonly password: string

    @ApiProperty({ description: '确认新密码' })
    readonly confirmPassword: string

    @ApiProperty({ description: '旧密码' })
    readonly oldPassword: string
}
