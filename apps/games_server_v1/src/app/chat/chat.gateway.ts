import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private readonly _server: Server;

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }

  handleConnection(client: Socket) {
    const { sockets } = this._server.sockets;

    console.log(`Client connected: ${client.id}`);
    console.log(`Total connected clients: ${sockets.size}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any) {
    console.log(`Message received from ${client.id}: ${payload}`);
    this._server.emit('message', payload);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string) {
    client.join(room);
    console.log(`Client ${client.id} joined room: ${room}`);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string) {
    client.leave(room);
    console.log(`Client ${client.id} left room: ${room}`);
  }

  @SubscribeMessage('typing')
  handleTyping(client: Socket, room: string) {
    client.to(room).emit('typing', { userId: client.id });
    console.log(`Client ${client.id} is typing in room: ${room}`);
  }

  @SubscribeMessage('stopTyping')
  handleStopTyping(client: Socket, room: string) {
    client.to(room).emit('stopTyping', { userId: client.id });
    console.log(`Client ${client.id} stopped typing in room: ${room}`);
  }

  @SubscribeMessage('gameAction')
  handleGameAction(client: Socket, { room, move }: { room: string; move: any }) {
    client.to(room).emit('gameMove', { userId: client.id, move });
    console.log(`Client ${client.id} made a move in room: ${room}`);
  }
}
