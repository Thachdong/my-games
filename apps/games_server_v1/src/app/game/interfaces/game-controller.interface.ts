import { CreateGameDto, CreateMoveDto, UpdateGameDto } from 'app/game/dto';
import { HttpResponse } from 'common/http-response';

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
  create(data: CreateGameDto): Promise<HttpResponse<void>>;

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
}
