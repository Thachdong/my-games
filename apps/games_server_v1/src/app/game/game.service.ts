import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { Repository } from 'typeorm';
import { Move } from './entities/move.entity';
import { IGameService } from 'app/game/interfaces';
import {
  CreateGameDto,
  CreateMoveDto,
  GameDto,
  UpdateGameDto,
} from 'app/game/dto';
import { PAGE_SIZE } from 'app/constants';
import { IPaginate } from 'types';

@Injectable()
export class GameService implements IGameService {
  constructor(
    @InjectRepository(Game) private readonly _gameRepository: Repository<Game>,
    @InjectRepository(Move) private readonly _moveRepository: Repository<Move>
  ) {}

  async createGame(data: CreateGameDto): Promise<GameDto> {
    const game = this._gameRepository.create(data);

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
    const game = await this._gameRepository.findOne({ where: { id } });

    if (!game) return null;

    return {
      ...game,
      moves: game.moves.map((m) => ({ ...m, gameId: game.id })),
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

  async addMove(data: CreateMoveDto): Promise<void> {
    const move = this._moveRepository.create(data);

    await this._moveRepository.save(move);
  }
}
