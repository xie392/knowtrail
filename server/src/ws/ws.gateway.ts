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
}
