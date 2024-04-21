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

@WebSocketGateway(3000, {
    transports: ['websocket'],
    cors: {
        origin: '*'
    }
})
export class WsGateway {
    constructor(private readonly wsService: WsService) {}

    @WebSocketServer()
    server: Server

    afterInit(server: Server) {
        this.server = server
        return this.wsService.verifyToken(server)
    }

    @SubscribeMessage('docUpdate')
    docUpdate(@MessageBody() data: any): Observable<WsResponse<any>> {
        return from([1, 2, 3]).pipe(map((item) => ({ event: 'events', data: { data, item } })))
    }

    /**
     * 获取文章内容
     * @param data
     * @returns
     */
    @SubscribeMessage('content')
    async getWContent(@MessageBody() data: { id: string }): Promise<WsResponse<string>> {
        console.log('获取文章内容', data)
        const content = await this.wsService.getWContent(data.id)
        return { event: 'content', data: content }
    }

    /**
     * 获取文章标题
     * @param data
     * @returns
     */
    @SubscribeMessage('content')
    async getWTitle(@MessageBody() data: { id: string }): Promise<WsResponse<string>> {
        console.log('获取文章内容', data)
        const content = await this.wsService.getWContent(data.id)
        return { event: 'content', data: content }
    }
}
