import {
  CreateTournamentDto,
  GetTournamentDto,
  TournamentPlayerDto,
  UpdateTournamentTitleDto,
} from 'app/tournament/dto';
import { HttpResponse } from 'common';

export interface ITournamentController {
  /**
   * Description: create torunament
   * @param data - CreateTournamentDto
   * @returns romise<HttpResponse<GetTournamentDto>>
   */
  create(data: CreateTournamentDto): Promise<HttpResponse<GetTournamentDto>>;

  /**
   * Description: Get all tournaments
   * @param page - number - optional
   * @param limit - number - optional
   * @returns Promise<HttpResponse<GetTournamentDto[]>>
   */
  getAll(
    page?: number,
    limit?: number
  ): Promise<HttpResponse<GetTournamentDto[]>>;

  /**
   * Description: Get tournament by id
   * @param id - UUID
   * @returns Promise<HttpResponse<GetTournamentDto[]>>
   */
  getById(id: string): Promise<HttpResponse<GetTournamentDto | null>>;

  /**
   * Description: Update tournament by id
   * @param id - UUID
   * @param data - UpdateTournamentTitleDto
   * @returns Promise<HttpResponse<void>>
   * Exceptions:
   * - HttpStatus.BAD_REQUEST
   */
  updateTournamentTitle(
    id: string,
    data: UpdateTournamentTitleDto
  ): Promise<HttpResponse<void>>;

  /**
   * Description: Player join tournament
   * @param id - UUID
   * @param data - TournamentPlayerDto
   * @returns Promise<HttpResponse<void>>
   * Exceptions:
   * - HttpStatus.BAD_REQUEST
   */
  playerJoin(
    id: string,
    data: TournamentPlayerDto
  ): Promise<HttpResponse<void>>;

  playerLeave(
    id: string,
    data: TournamentPlayerDto
  ): Promise<HttpResponse<void>>;
}
