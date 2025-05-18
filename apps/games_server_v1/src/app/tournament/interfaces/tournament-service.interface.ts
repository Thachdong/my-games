import { IPaginate } from 'types/paginate';
import { CreateTournamentDto, GetTournamentDto } from 'app/tournament/dto';

export interface ITournamentService {
  /**
   * Description: Create tournament
   * @param data - CreateTournamentDto
   * @returns tournament - GetTournamentDto
   */
  create(data: CreateTournamentDto): Promise<GetTournamentDto>;

  /**
   * Description: Get all tournament
   * @param page - number - optional
   * @param limit - number - optional
   * @returns Promise<IPaginate<GetTournamentDto>>
   */
  getAll(page?: number, limit?: number): Promise<IPaginate<GetTournamentDto>>;

  /**
   * Description: Get tournament by id
   * @param id - UUID
   * @returns Promise<IPaginate<GetTournamentDto>>
   * Exceptions:
   * - HttpStatus.NOT_FOUND
   */
  getById(id: string): Promise<GetTournamentDto | null>;

  /**
   * Description: Update title of a tournament
   * @param id - UUID
   * @param title - string
   * @returns Promise<GetTournamentDto>
   * Exceptions:
   * - HttpStatus.BAD_REQUEST
   */
  updateTitle(id: string, title: string): Promise<GetTournamentDto>;

  /**
   * Description: Player join the tournament
   * @param tournamentId - UUID
   * @param userId - UUID
   * @returns Promise<void>
   * Exception:
   * - HttpStatus.BAD_REQUEST - tournament not found
   * - HttpStatus.BAD_REQUEST - user already joined
   */
  playerJoin(tournamentId: string, userId: string): Promise<void>;

  /**
   * Description: Player leave the tournament
   * @param tournamentId  - UUID
   * @param userId - UUID
   * @returns Promise<void>
   */
  playerLeave(tournamentId: string, userId: string): Promise<void>;
}
