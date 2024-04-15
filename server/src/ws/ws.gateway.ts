import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    WsResponse,
    WebSocketServer
} from '@nestjs/websockets'
import { WsService } from './ws.service'
import { from, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Server } from 'socket.io'
import { UsersService } from '../system/users/users.service'

@WebSocketGateway(3000, {
    transports: ['websocket'],
    cors: {
        origin: '*'
    }
})
export class WsGateway {
    constructor(
        private readonly wsService: WsService,
        private readonly userService: UsersService
    ) {}

    @WebSocketServer()
    server: Server

    afterInit(server: Server) {
        this.server = server
        return this.wsService.verifyToken(server)
        // this.server.use((socket, next) => {
        //     // 在这里可以访问客户端发送的请求头，从中提取 token 进行验证
        //     const token = socket.handshake.auth.token
        //     if (this.userService.verifyToken(token)) {
        //         return next()
        //     } else {
        //         socket.emit('error', 'Authentication error')
        //         socket.disconnect()
        //         return next(new Error('Authentication error'))
        //     }
        // })
    }

    @SubscribeMessage('docUpdate')
    docUpdate(@MessageBody() data: any): Observable<WsResponse<any>> {
        return from([1, 2, 3]).pipe(map((item) => ({ event: 'events', data: { data, item } })))
    }
}
