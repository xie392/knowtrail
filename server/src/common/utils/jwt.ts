import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Injectable } from '@nestjs/common'

export const JwtConfig = {
    imports: [ConfigModule],
    useFactory: async (config: ConfigService) => ({
        secret: config.get('jwt.secretkey'),
        signOptions: {
            expiresIn: config.get('jwt.expiresin')
        }
    }),
    inject: [ConfigService]
}

export const getUserId = (jwtService: JwtService, token: string) => {
    try {
        return jwtService.verify(token?.replace('Bearer ', ''))
    } catch (error) {
        return null
    }
}

interface JwtPayload {
    accessToken: string
    refreshToken: string
}

@Injectable()
export class JwtImplService {
    constructor(private jwtService: JwtService, private config: ConfigService) {}

    /**
     * 加密内容
     * @param {any} payload 要加密的内容
     * @returns JwtPayload
     */
    generateToken(payload: any): JwtPayload {
        const accessToken = `Bearer ${this.jwtService.sign(payload)}`
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: this.config.get('jwt.refreshExpiresIn')
        })
        return { accessToken, refreshToken }
    }

    /**
     * 刷新 token
     * @param refreshToken
     * @returns
     */
    refreshToken(refreshToken: string): string {
        const accessToken = this.jwtService.sign({ refreshToken })
        return accessToken
    }

    /**
     * 获取用户 id
     * @param token token
     * @returns
     */
    getUserId(token: string): string | null {
        try {
            const { id } = this.jwtService.verify(token?.replace('Bearer ', ''))
            return id
        } catch (error) {
            return null
        }
    }
}
