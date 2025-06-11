import { GameMoveBodyDto, JoinChatRoomDto, MessageBodyDto } from 'app/chat/dto';
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
  JOIN_ROOM = 'joinRoom',
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
   * ============================= Event: Message =================================
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

    this._server.to(roomId).emit(ESubscribeEvents.MESSAGE, result);
  }

  /**
   * ============================= Event: GAME_MOVE =================================
   */
  @SubscribeMessage(ESubscribeEvents.JOIN_ROOM)
  async handleJoinChatRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: JoinChatRoomDto
  ) {
    const { roomId } = payload;

    client.join(roomId);
  }

  /**
   * ============================= Event: GAME_MOVE =================================
   */
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

    this._server.to(gameId).emit(ESubscribeEvents.GAME_MOVE, createdMove);
  }

  /**
   * ============================= Event: USER_JOINED_GAME =================================
   */
  @SubscribeMessage(ESubscribeEvents.USER_JOINED_GAME)
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() gameId: string
  ) {
    const userId = client.data.user.id;
    const user = await this._userService.getUserById(userId);

    if (user) {
      await this._gameService.joinGame(gameId, user.id);

      this._server.to(gameId).emit(ESubscribeEvents.USER_JOINED_GAME, {
        userId: user.id,
      });
    }
  }

  /**
   * ============================= Event: USER_JOINED_TOURNAMENT =================================
   */
  @SubscribeMessage(ESubscribeEvents.USER_JOINED_TOURNAMENT)
  async handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() tournamentId: string
  ) {
    const userId = client.data.user.sub;

    if (userId) {
      await this._tournamentService.playerJoin(tournamentId, userId);

      this._server
        .to(tournamentId)
        .emit(ESubscribeEvents.USER_JOINED_TOURNAMENT, {
          userId,
        });
    }
  }

  /**
   * ============================= Event: USER_LEFT_TOURNAMENT =================================
   */
  @SubscribeMessage(ESubscribeEvents.USER_LEFT_TOURNAMENT)
  async handleRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() tournamentId: string
  ) {
    const userId = client.data.user.sub;

    if (userId) {
      await this._tournamentService.playerLeave(tournamentId, userId);

      this._server
        .to(tournamentId)
        .emit(ESubscribeEvents.USER_LEFT_TOURNAMENT, {
          userId,
        });
    }
  }
}
