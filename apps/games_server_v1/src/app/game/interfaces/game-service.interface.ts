import { CreateGameDto, CreateMoveDto, GameDto, UpdateGameDto } from "app/game/dto";

export interface IGameService {
    /**
     * Description: Create game
     * @param data - CreateGameDto
     * @returns game - GameDto
     */
    createGame(data: CreateGameDto): Promise<GameDto>;

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
    updateGame(id: string, data: UpdateGameDto): Promise<GameDto | void>

    /**
     * Description: Add move
     * @param data - CreateMoveDto
     * @reutrns void
     */
    addMove(data: CreateMoveDto): Promise<void>
}