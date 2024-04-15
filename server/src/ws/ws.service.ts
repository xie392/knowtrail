import { Injectable } from '@nestjs/common'
import { UsersService } from '../system/users/users.service'
import { Server } from 'socket.io'
// import { CreateWDto } from './dto/create-w.dto';
// import { UpdateWDto } from './dto/update-w.dto';

@Injectable()
export class WsService {
    constructor(private readonly userService: UsersService) {}

    /**
     * 验证 token
     * @param server Server
     */
    verifyToken(server: Server) {
        server.use((socket, next) => {
            // 在这里可以访问客户端发送的请求头，从中提取 token 进行验证
            const token = socket.handshake.auth.token
            if (this.userService.verifyToken(token)) {
                return next()
            } else {
                return next(new Error('Authentication error'))
            }
        })
    }
}
