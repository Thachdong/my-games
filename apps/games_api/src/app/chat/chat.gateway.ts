import { GameMoveBodyDto, MessageBodyDto } from 'app/chat/dto';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from 'app/chat/chat.service';
import { GameService } from 'app/game/game.service';
import { CreateMoveDto } from 'app/game/dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'app/user/user.service';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: true })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private readonly _server: Server;

  constructor(
    private readonly _chatService: ChatService,
    private readonly _gameService: GameService,
    private readonly _jwtService: JwtService,
    private readonly _userService: UserService
  ) {}

  /**
   * ============================= life circle methods =================================
   */
  afterInit() {
    Logger.log('WebSocket server initialized');
  }

  handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token?.split(' ')[1];

      if (!token) {
        client.disconnect();
        return;
      }

      const payload = this._jwtService.verify(token);
      client.data.user = payload;
      Logger.log(`Client connected: ${client.id}, user: ${payload.email}`);
    } catch (error) {
      Logger.error('Error during WebSocket connection:', error);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    Logger.log(`Client disconnected: ${client.id}`);
  }

  /**
   * ============================= socket events =================================
   */
  @SubscribeMessage('message')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: MessageBodyDto
  ) {
    const { roomId, message } = payload;
    const userId = client.data.user.id;

    const user = await this._userService.getUserById(userId)

    Logger.log(user)

    const result = await this._chatService.createMessage({
      roomId,
      userId,
      content: message,
    });

    client.to(roomId).emit('message', result);
  }

  @SubscribeMessage('gameMove')
  async handleGameAction(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: GameMoveBodyDto
  ) {
    const { gameId, positionX, positionY } = payload;
    const userId = client.data.user.id;

    const moveData: CreateMoveDto = {
      userId,
      gameId,
      positionX,
      positionY,
      timestamp: new Date(),
    };

    const createdMove = await this._gameService.addMove(moveData);

    client.to(gameId).emit('gameMove', createdMove);
  }

  @SubscribeMessage('userJoinedGame')
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: string
  ) {
    const userId = client.data.user.id;
    const user = await this._userService.getUserById(userId);

    if (user) {
      await this._gameService.joinGame(roomId, user);

      client.to(roomId).emit('userJoinedGame', {
        userId: user.id,
      });
    }
  }
}
