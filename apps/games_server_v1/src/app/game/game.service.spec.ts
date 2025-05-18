import { Test } from '@nestjs/testing';
import { GameService } from './game.service';
import { Game, Move } from 'app/game/entities';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateGameDto, CreateMoveDto, UpdateGameDto } from 'app/game/dto';

describe('GameService', () => {
  let gameRepository: Repository<Game>;
  let moveRepository: Repository<Move>;
  let gameService: GameService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GameService,
        {
          provide: getRepositoryToken(Game),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Move),
          useClass: Repository,
        },
      ],
    }).compile();

    gameService = module.get<GameService>(GameService);
    gameRepository = module.get<Repository<Game>>(getRepositoryToken(Game));
    moveRepository = module.get<Repository<Move>>(getRepositoryToken(Move));
  });

  describe('Test game service is defined', () => {
    it('User service should be defined', () => {
      expect(gameService).toBeDefined();
    });
  });

  describe('Test method createGame', () => {
    it('Should create game successfull', async () => {
      const gameData = new CreateGameDto();
      const newGame = new Game();
      newGame.id = '1';

      jest.spyOn(gameRepository, 'create').mockReturnValue(newGame);
      jest.spyOn(gameRepository, 'save').mockResolvedValueOnce(null);

      await gameService.createGame(gameData);

      expect(gameRepository.create).toHaveBeenCalledWith(gameData);
      expect(gameRepository.save).toHaveBeenCalledWith(newGame);
    });
  });
  describe('Test method updateGame', () => {
    const gameId = '1';
    const startTime = new Date();
    const data: UpdateGameDto = { startTime };
    const game = new Game();
    game.moves = []

    it('should update game successfully', async () => {
      jest.spyOn(gameRepository, 'findOne').mockResolvedValueOnce(game);
      jest.spyOn(gameRepository, 'save').mockResolvedValueOnce({ ...game, ...data } as Game);

      await gameService.updateGame(gameId, data);

      expect(gameRepository.findOne).toHaveBeenCalledWith({ where: { id: gameId } });
      expect(gameRepository.save).toHaveBeenCalledWith({ ...game, ...data });
    });

    it('should throw an error if game not found', async () => {
      jest.spyOn(gameRepository, 'findOne').mockResolvedValueOnce(null);

      await expect(gameService.updateGame(gameId, data)).rejects.toThrow();
    });
  });
  describe('Test method addMove', () => {
    const move = new Move();
    const data = new CreateMoveDto();
    it('Should add move to game successfully', async () => {
      jest.spyOn(moveRepository, 'create').mockReturnValueOnce(move);
      jest.spyOn(moveRepository, 'save').mockResolvedValueOnce(null);

      await gameService.addMove(data);

      expect(moveRepository.create).toHaveBeenCalledWith(data);
      expect(moveRepository.save).toHaveBeenCalledWith(move);
    });
  });
});
