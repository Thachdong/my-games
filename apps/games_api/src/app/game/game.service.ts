import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { Repository } from 'typeorm';
import { Move } from './entities/move.entity';
import { IGameService } from 'app/game/interfaces';
import {
  CreateGameDto,
  CreateMoveDto,
  GameDto,
  GetMoveDto,
  UpdateGameDto,
} from 'app/game/dto';
import { PAGE_SIZE } from 'common/constants';
import { IPaginate } from 'types';
import { User } from 'app/user/entities/user.entity';

@Injectable()
export class GameService implements IGameService {
  constructor(
    @InjectRepository(Game) private readonly _gameRepository: Repository<Game>,
    @InjectRepository(Move) private readonly _moveRepository: Repository<Move>
  ) {}

  async createGame(data: CreateGameDto, userId: string): Promise<GameDto> {
    const playerEntity = await this._gameRepository.manager.findOne(User, { where: { id: userId } });

    if (!playerEntity) {
      throw new HttpException(`User with id ${userId} not found`, HttpStatus.BAD_REQUEST);
    }

    const game = this._gameRepository.create({
      ...data,
      players: [playerEntity],
      moves: []
    });

    await this._gameRepository.save(game);

    const gameDto: GameDto = {
      ...game,
      moves: [],
      players: [],
    };

    return gameDto;
  }

  async getAllGame(page?: number, limit?: number): Promise<IPaginate<GameDto>> {
    const take = limit || PAGE_SIZE;
    const skip = ((page || 1) - 1) * take;

    const [games, total] = await this._gameRepository.findAndCount({
      take,
      skip,
      relations: ['moves', 'players']
    });

    return {
      page: page || 1,
      limit: take,
      total,
      data: games.map((g) => ({
        ...g,
        moves: g.moves.map((m) => ({
          ...m,
          gameId: g.id,
        })),
      })),
    };
  }

  async getGameById(id: string): Promise<GameDto | null> {
    const game = await this._gameRepository.findOne({
      where: { id },
      relations: ['moves', 'players'],
    });

    if (!game) return null;

    return {
      ...game,
      moves: game.moves.map((m) => ({ ...m, gameId: game.id })),
      players: game.players.map((p) => ({ ...p })),
    };
  }

  async updateGame(id: string, data: UpdateGameDto): Promise<GameDto | void> {
    const game = await this._gameRepository.findOne({ where: { id } });

    if (!game) {
      throw new HttpException(
        `Game with id ${id} not found`,
        HttpStatus.BAD_REQUEST
      );
    }

    Object.assign(game, data);

    await this._gameRepository.save(game);

    return {
      ...game,
      moves: game.moves.map((move) => ({ ...move, gameId: game.id })),
    };
  }

  async addMove(data: CreateMoveDto): Promise<GetMoveDto> {
    const move = this._moveRepository.create(data);

    const result = await this._moveRepository.save(move);

    return { ...result, gameId: result.game.id, userId: result.userId };
  }

  async joinGame(gameId: string, playerId: string): Promise<void> {
    const game = await this._gameRepository.findOne({
      where: { id: gameId },
      relations: ['players'],
    });

    const playerEntity = await this._gameRepository.manager.findOne(User, {
      where: {
        id: playerId
      }
    })

    if (!game || !playerEntity) {
      throw new HttpException(
        `Game with id ${gameId} not found`,
        HttpStatus.NOT_FOUND
      );
    }

    const isPlayerAlreadyInGame = game.players.some((p) => p.id === playerId);

    if (isPlayerAlreadyInGame) {
      throw new HttpException(
        `Player with id ${playerId} already in game`,
        HttpStatus.BAD_REQUEST
      );
    }

    game.players.push(playerEntity);

    await this._gameRepository.save(game);
  }
}
