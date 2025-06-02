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
import { TournamentService } from 'app/tournament/tournament.service';

export enum ESubscribeEvents {
  MESSAGE = 'message',
  GAME_MOVE = 'gameMove',
  USER_JOINED_GAME = 'userJoinedGame',
  USER_JOINED_TOURNAMENT = 'userJoinedTournament',
  USER_LEFT_TOURNAMENT = 'userLeftTournament',
}

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
    private readonly _userService: UserService,
    private readonly _tournamentService: TournamentService
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
  @SubscribeMessage(ESubscribeEvents.MESSAGE)
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: MessageBodyDto
  ) {
    const { roomId, message } = payload;
    const userId = client.data.user.sub;

    const result = await this._chatService.createMessage({
      roomId,
      userId,
      content: message,
    });

    client.to(roomId).emit(ESubscribeEvents.MESSAGE, result);
  }

  @SubscribeMessage(ESubscribeEvents.GAME_MOVE)
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

    client.to(gameId).emit(ESubscribeEvents.GAME_MOVE, createdMove);
  }

  @SubscribeMessage(ESubscribeEvents.USER_JOINED_GAME)
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() gameId: string
  ) {
    const userId = client.data.user.id;
    const user = await this._userService.getUserById(userId);

    if (user) {
      await this._gameService.joinGame (gameId, user);

      client.to(gameId).emit(ESubscribeEvents.USER_JOINED_GAME, {
        userId: user.id,
      });
    }
  }

  @SubscribeMessage(ESubscribeEvents.USER_JOINED_TOURNAMENT)
  async handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() tournamentId: string
  ) {
    const userId = client.data.user.sub;

    if (userId) {
      await this._tournamentService.playerJoin(tournamentId, userId);

      client.to(tournamentId).emit(ESubscribeEvents.USER_JOINED_TOURNAMENT, {
        userId,
      });
    }
  }

  @SubscribeMessage(ESubscribeEvents.USER_LEFT_TOURNAMENT)
  async handleRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() tournamentId: string
  ) {
    const userId = client.data.user.sub;

    if (userId) {
      await this._tournamentService.playerLeave(tournamentId, userId);

      client.to(tournamentId).emit(ESubscribeEvents.USER_LEFT_TOURNAMENT, {
        userId,
      });
    }
  }
}
