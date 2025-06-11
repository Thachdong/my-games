import {
  CreateGameDto,
  CreateMoveDto,
  GameDto,
  UpdateGameDto,
} from 'app/game/dto';
import { HttpResponse } from 'common/http-response';
import { TJwtPayload } from 'types';

export interface IGameController {
  /**
   * Description: Create game controller
   * @param data - CreateGameDto
   * @returns Promise<HttpResponse<void>>
   * HttpStatus:
   * - HttpStatus.CREATED
   * - HttpStatus.BAD_REQUEST
   * - HttpStatus.UNAUTHORIZED
   */
  create(data: CreateGameDto, payload: TJwtPayload): Promise<HttpResponse<void>>;

  /**
   * Description: Get all games controller
   * @param page - number - optinal
   * @param limit - number - optional
   * @returns Promise<HttpResponse<IPaginate<GameDto>>>
   * HttpStatus:
   * - HttpStatus.OK
   * - HttpStatus.UNAUTHORIZED
   */
  getAll(page?: number, limit?: number): Promise<HttpResponse<GameDto[]>>;

  /**
   * Description: Update game controller
   * @param id - UUID
   * @param data - UpdateGameDto
   * @returns Promise<HttpResponse<void>>
   * HttpStatus:
   * - HttpStatus.OK
   * - HttpStatus.NOT_FOUND
   * - HttpStatus.UNAUTHORIZED
   */
  getGameById(id: string): Promise<HttpResponse<GameDto>>;

  /**
   * Description: Update game controller
   * @param id - UUID
   * @param data - UpdateGameDto
   * @returns Promise<HttpResponse<void>>
   * HttpStatus:
   * - HttpStatus.OK
   * - HttpStatus.BAD_REQUEST
   * - HttpStatus.UNAUTHORIZED
   */
  update(id: string, data: UpdateGameDto): Promise<HttpResponse<void>>;

  /**
   * Description: Add game move controller
   * @param id - UUID
   * @param data - CreateMoveDto
   * @returns Promise<HttpResponse<void>>
   * HttpStatus:
   * - HttpStatus.OK
   * - HttpStatus.BAD_REQUEST
   * - HttpStatus.UNAUTHORIZED
   */
  addMove(id: string, data: CreateMoveDto): Promise<HttpResponse<void>>;

  /**
   * Description: User join game controller
   * @param gameId - UUID
   * @param jwtPayload - Jwt payload
   */
  join(gameId: string, jwtPayload: TJwtPayload): Promise<HttpResponse<void>>;
}
