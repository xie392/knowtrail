import { Socket, io } from 'socket.io-client'

export function createSocket(token: string): Socket {
    if (!token) throw new Error('User not logged in')
    const socket = io(import.meta.env.VITE_SOCKET_URL as string, {
        auth: {
            token
        },
        transports: ['websocket']
    })
    return socket
}

export function closeSocket(socket: Socket) {
    socket.close()
}
