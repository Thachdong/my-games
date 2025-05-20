import {
  CreateTournamentRankDto,
  UpdateTournamentRankDto,
} from 'app/tournament/dto';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TournamentRank } from 'app/tournament/entities/tournament-rank.entity';
import { TournamentRankService } from 'app/tournament/tournament-rank.service';
import { Repository } from 'typeorm';
import { Tournament } from 'app/tournament/entities/tournament.entity';

describe('TournamentRankService', () => {
  let service: TournamentRankService;
  let repository: Repository<TournamentRank>;
  const tournament = new Tournament();
  tournament.id = '550e8400-e29b-41d4-a716-446655440000';

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TournamentRankService,
        {
          provide: getRepositoryToken(TournamentRank),
          useClass: Repository<TournamentRank>,
        },
      ],
    }).compile();

    service = module.get<TournamentRankService>(TournamentRankService);
    repository = module.get<Repository<TournamentRank>>(
      getRepositoryToken(TournamentRank)
    );
  });

  describe('Tournament rank', () => {
    it('Should tournament rank created successfully', async () => {
      expect(service).toBeDefined();
    });
  });
  describe('Test method createRank', () => {
    it('Should create rank successfully', async () => {
      const data = new CreateTournamentRankDto();
      const rank = new TournamentRank();
      rank.tournament = tournament;

      jest
        .spyOn(repository, 'create')
        .mockReturnValueOnce(rank as TournamentRank);
      jest.spyOn(repository, 'save').mockResolvedValueOnce(undefined);

      const result = await service.createRank(data);

      expect(repository.create).toHaveBeenCalledWith(data);
      expect(repository.save).toHaveBeenCalledWith(rank);
      expect(result.tournamentId).toEqual(rank.tournament.id);
    });
  });
  describe('Test method getAll', () => {
    const page = 1;
    const limit = 10;
    const rank = new TournamentRank();
    rank.id = '550e8400-e29b-41d4-a716-446655440000';
    rank.tournament = tournament;

    it('Should get one rank', async () => {
      const take = limit;
      const skip = (page - 1) * limit;
      jest.spyOn(repository, 'findAndCount').mockResolvedValueOnce([[rank], 1]);

      const result = await service.getAll(page, limit);

      expect(repository.findAndCount).toHaveBeenCalledWith({ take, skip });
      expect(result.data.length).toEqual(1);
    });
    it('Should get zero rank', async () => {
      const take = limit;
      const nextPage = 2;
      const skip = (nextPage - 1) * limit;
      jest.spyOn(repository, 'findAndCount').mockResolvedValueOnce([[], 1]);

      const result = await service.getAll(nextPage, limit);

      expect(repository.findAndCount).toHaveBeenCalledWith({ take, skip });
      expect(result.data.length).toEqual(0);
    });
  });
  describe('Test method updateRank', () => {
    const data = new UpdateTournamentRankDto();
    data.rankNo = 2;
    const rank = new TournamentRank();
    rank.tournament = tournament;

    it('Should update rank successfully', async () => {
      const rankId = '550e8400-e29b-41d4-a716-446655440000';
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(rank);
      jest.spyOn(repository, 'save').mockResolvedValueOnce(undefined);

      const result = await service.updateRank(rankId, data);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: rankId },
      });
      expect(result.rankNo).toEqual(2);
    });
    it('Should update rank failed', async () => {
      const rankId = '550e8400-e29b-41d4-a716-446655440000';
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(service.updateRank(rankId, data)).rejects.toThrow();
    });
  });
});
