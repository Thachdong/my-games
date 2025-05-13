import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { Repository } from 'typeorm';
import { UpdateGameDto } from './dto/update-game.dto';
import { CreateGameDto } from './dto/create-game.dto';
import { CreateMoveDto } from './dto/create-move.dto';
import { Move } from './entities/move.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game) private readonly _gameRepository: Repository<Game>,
    @InjectRepository(Move) private readonly _moveRepository: Repository<Move>
  ) {}

  /**
   * Create game
   * @param data
   * @returns game
   */
  async createGame(data: CreateGameDto) {
    const game = this._gameRepository.create(data);

    await this._gameRepository.save(game);

    return game;
  }

  /**
   * update game
   * @param id
   * @param data
   */
  async updateGame(id: string, data: UpdateGameDto) {
    const game = await this._gameRepository.findOne({ where: { id } });

    if (!game) {
      throw new HttpException(
        `Game with id ${id} not found`,
        HttpStatus.BAD_REQUEST
      );
    }

    Object.assign(game, data);

    await this._gameRepository.save(game);

    return game;
  }

  /**
   * Add move to game
   * @param data
   * @returns move
   */
  async addMove(data: CreateMoveDto) {
    const game = this._moveRepository.create(data);

    return this._gameRepository.save(game);
  }
}
