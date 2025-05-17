import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { Repository } from 'typeorm';
import { Move } from './entities/move.entity';
import { IGameService } from 'app/game/interfaces';
import { CreateGameDto, CreateMoveDto, GameDto, UpdateGameDto } from "app/game/dto";


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
      players: []
    };

    return gameDto;
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
      moves: game.moves.map(move => ({ ...move, gameId: game.id }))
    };
  }

  async addMove(data: CreateMoveDto): Promise<void> {
    const game = this._moveRepository.create(data);

    await this._gameRepository.save(game);
  }
}
