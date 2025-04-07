import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game, GameStatus, GameResult } from './entities/game.entity';
import { Move } from './entities/move.entity';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    @InjectRepository(Move)
    private readonly moveRepository: Repository<Move>,
  ) {}

  async createGame(playerId: string): Promise<Game> {
    const game = this.gameRepository.create({
      player1Id: playerId,
      status: GameStatus.WAITING,
      isPrivate: false,
      boardSize: 15,
      roundTimeSeconds: 20,
    });
    return this.gameRepository.save(game);
  }

  async getGame(gameId: string): Promise<Game> {
    const game = await this.gameRepository.findOne({
      where: { id: gameId },
      relations: ['moves'],
    });
    if (!game) throw new NotFoundException(`Game ${gameId} not found`);
    return game;
  }

  async makeMove(gameId: string, playerId: string, move: Partial<Move>): Promise<{ move: Move; game: Game; gameFinished: boolean }> {
    const game = await this.getGame(gameId);
    const newMove = this.moveRepository.create({
      ...move,
      gameId,
      playerId,
    });
    
    const savedMove = await this.moveRepository.save(newMove);
    
    // Check if game is finished (simplified logic)
    const gameFinished = false; // Add your game completion logic here
    
    return { move: savedMove, game, gameFinished };
  }

  async joinGame(gameId: string, userId: string, password?: string): Promise<Game> {
    const game = await this.getGame(gameId);
    
    if (game.isPrivate && game.password !== password) {
      throw new ForbiddenException('Invalid password');
    }
    
    if (game.player1Id === userId || game.player2Id === userId) {
      return game;
    }
    
    if (game.player2Id) {
      throw new ForbiddenException('Game is full');
    }
    
    game.player2Id = userId;
    game.status = GameStatus.IN_PROGRESS;
    return this.gameRepository.save(game);
  }

  async surrender(gameId: string, userId: string): Promise<{ game: Game }> {
    const game = await this.getGame(gameId);
    
    if (game.status !== GameStatus.IN_PROGRESS) {
      throw new ForbiddenException('Game is not in progress');
    }
    
    if (game.player1Id !== userId && game.player2Id !== userId) {
      throw new ForbiddenException('You are not a player in this game');
    }
    
    game.status = GameStatus.FINISHED;
    game.result = userId === game.player1Id ? GameResult.PLAYER2_WIN : GameResult.PLAYER1_WIN;
    
    const updatedGame = await this.gameRepository.save(game);
    return { game: updatedGame };
  }
} 