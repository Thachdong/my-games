import { CreateTournamentRankDto, GetTournamentRankDto, UpdateTournamentRankDto } from "app/tournament/dto";

export interface ITournamentRankService {
    /**
   * Description: Create tournament rank
   * @param data - CreateTournamentRankDto
   * @returns Promise<TournamentRank>
   * Exception:
   * - HttpStatus.BAD_REQUEST - tournament not found
   * - HttpStatus.BAD_REQUEST - user already leaved
   */
  createRank(data: CreateTournamentRankDto): Promise<GetTournamentRankDto>;

  /**
   * Description: Update tournament rank
   * @param id - UUID
   * @param data - UpdateTournamentRankDto
   * @returns Promise<GetTournamentRankDto | void>
   * Exceptions:
   * - HttpStatus.BAD_REQUEST
   */
  updateRank(
    id: string,
    data: UpdateTournamentRankDto
  ): Promise<GetTournamentRankDto | void>;
}