import { Injectable } from '@nestjs/common'
import { UsersService } from '../system/users/users.service'
import { Server } from 'socket.io'
import { DocService } from '../system/doc/doc.service'
// import { ResultData } from '../common/utils/result'
import { UserEntity } from 'src/system/users/entities/user.entity'
// import { CreateWDto } from './dto/create-w.dto';
// import { UpdateWDto } from './dto/update-w.dto';

@Injectable()
export class WsService {
    private user: UserEntity

    constructor(
        private readonly userService: UsersService,
        private readonly docService: DocService
    ) {}

    /**
     * 验证 token
     * @param server Server
     */
    verifyToken(server: Server) {
        server.use((socket, next) => {
            // 在这里可以访问客户端发送的请求头，从中提取 token 进行验证
            const token = socket.handshake.auth.token
            const user = this.userService.verifyToken(token)
            if (user) {
                this.user = user
                return next()
            } else {
                return next(new Error('Authentication error'))
            }
        })
    }

    /**
     * 获取文档内容
     */
    async getWContent(id: string): Promise<string> {
        const { data } = await this.docService.findOne(id, this.user)
        if (data) {
            return data.content
        } else {
            return ''
        }
    }
}
