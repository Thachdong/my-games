import { IPaginate } from 'types';
import {
  CreateGameDto,
  CreateMoveDto,
  GameDto,
  GetMoveDto,
  PlayerDto,
  UpdateGameDto,
} from 'app/game/dto';

export interface IGameService {
  /**
   * Description: Create game
   * @param data - CreateGameDto
   * @returns game - GameDto
   */
  createGame(data: CreateGameDto, userId: string): Promise<GameDto>;

  /**
   * Description: Get all games
   * @param page - number - optinal
   * @param limit - number - optional
   * @returns Promise<IPaginate<GameDto>>
   */
  getAllGame(page?: number, limit?: number): Promise<IPaginate<GameDto>>;

  /**
   * Description: Get all game by id
   * @param id - UUID
   * @returns Promise<GameDto | null>
   */
  getGameById(id: string): Promise<GameDto | null>;

  /**
   * Description: Update game
   * @param id - UUID
   * @param data - UpdateGameDto
   * @implements
   * - Get game by id
   * - Update game
   * Exceptions:
   * - BAD_REQUEST
   */
  updateGame(id: string, data: UpdateGameDto): Promise<GameDto | void>;

  /**
   * Description: Add move
   * @param data - CreateMoveDto
   * @reutrns void
   */
  addMove(data: CreateMoveDto): Promise<GetMoveDto>;

  /**
   * Description: Player join game
   * @param gameId - UUID - game id
   * @param playerId - UUID - player
   * @returns Promise<void>
   * @throws NOT_FOUND
   */
  joinGame(gameId: string, playerId: string): Promise<void>;
}
