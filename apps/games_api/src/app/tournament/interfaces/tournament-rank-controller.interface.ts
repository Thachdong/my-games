import {
  CreateTournamentRankDto,
  GetTournamentRankDto,
  UpdateTournamentRankDto,
} from 'app/tournament/dto';
import { HttpResponse } from 'common';

export interface ITournamentRankController {
  /**
   * Description: Create tournament rank
   * @param data -
   * @returns <GetTournamentRankDto>>
   * Exceptions:
   * - HttpStatus.BAD_REQUEST
   */
  create(
    data: CreateTournamentRankDto
  ): Promise<HttpResponse<GetTournamentRankDto>>;

  /**
   * Description: Get all ranks
   * @param page - number - optional
   * @param limit - number - optional
   * @returns Promise<HttpResponse<GetTournamentRankDto[]>>
   */
  getAll(
    page?: number,
    limit?: number
  ): Promise<HttpResponse<GetTournamentRankDto[]>>;

  /**
   * Description: Update rank by id
   * @param id - UUID
   * @param data - UpdateTournamentRankDto
   * @returns Promise<HttpResponse<GetTournamentRankDto | void>>
   * Exceptions:
   * - HttpStatus.BAD_REQUEST
   */
  updateRank(
    id: string,
    data: UpdateTournamentRankDto
  ): Promise<HttpResponse<null>>;
}
