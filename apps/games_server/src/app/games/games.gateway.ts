import { 
  ConnectedSocket, 
  MessageBody, 
  OnGatewayConnection, 
  OnGatewayDisconnect, 
  SubscribeMessage, 
  WebSocketGateway, 
  WebSocketServer 
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GamesService } from './games.service';
import { WsJwtGuard } from '../auth/guards/ws-jwt.guard';
import { MakeMoveDto } from './dto/make-move.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'games',
})
export class GamesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private gamesService: GamesService,
    private jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token?.split(' ')[1];
      if (!token) {
        client.disconnect();
        return;
      }

      const payload = this.jwtService.verify(token);
      client.data.user = payload;
      console.log(`Client connected: ${client.id}, user: ${payload.email}`);
    } catch (error) {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('joinGame')
  async handleJoinGame(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { gameId: string, password?: string }
  ) {
    try {
      const { gameId, password } = data;
      const userId = client.data.user.sub;
      
      const game = await this.gamesService.joinGame(gameId, userId, password);
      
      // Join the game room
      client.join(`game:${gameId}`);
      
      // Notify all clients in the game room
      this.server.to(`game:${gameId}`).emit('gameUpdate', game);
      
      return { success: true, game };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('makeMove')
  async handleMakeMove(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { gameId: string, move: MakeMoveDto }
  ) {
    try {
      const { gameId, move } = data;
      const userId = client.data.user.sub;
      
      const result = await this.gamesService.makeMove(gameId, userId, move);
      
      // Notify all clients in the game room
      this.server.to(`game:${gameId}`).emit('gameUpdate', result.game);
      
      if (result.gameFinished) {
        this.server.to(`game:${gameId}`).emit('gameFinished', {
          gameId,
          result: result.game.result,
          winnerScore: result.game.winnerScore,
          loserScore: result.game.loserScore,
        });
      }
      
      return { success: true, ...result };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('requestWithdraw')
  async handleRequestWithdraw(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { gameId: string }
  ) {
    const { gameId } = data;
    const userId = client.data.user.sub;
    
    // Notify the opponent about the withdraw request
    this.server.to(`game:${gameId}`).emit('withdrawRequest', {
      gameId,
      userId,
    });
    
    return { success: true };
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('requestSurrender')
  async handleRequestSurrender(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { gameId: string }
  ) {
    try {
      const { gameId } = data;
      const userId = client.data.user.sub;
      
      const result = await this.gamesService.surrender(gameId, userId);
      
      // Notify all clients in the game room
      this.server.to(`game:${gameId}`).emit('gameUpdate', result.game);
      this.server.to(`game:${gameId}`).emit('gameFinished', {
        gameId,
        result: result.game.result,
        winnerScore: result.game.winnerScore,
        loserScore: result.game.loserScore,
      });
      
      return { success: true, game: result.game };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('requestReplay')
  async handleRequestReplay(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { gameId: string }
  ) {
    const { gameId } = data;
    const userId = client.data.user.sub;
    
    // Notify the opponent about the replay request
    this.server.to(`game:${gameId}`).emit('replayRequest', {
      gameId,
      userId,
    });
    
    return { success: true };
  }
} 