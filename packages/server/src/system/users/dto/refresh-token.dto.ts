import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class RefreshTokenDto {
    @ApiProperty({ description: 'refreshToken' })
    @IsString({ message: 'refreshToken 类型错误，正确类型 string' })
    @IsNotEmpty({ message: 'refreshToken 不能为空' })
    readonly refreshToken: string
}
