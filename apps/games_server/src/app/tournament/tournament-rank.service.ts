import { ITournamentRankService } from 'app/tournament/interfaces';
import { TournamentRank } from './entities/tournament-rank.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateTournamentRankDto,
  GetTournamentRankDto,
  UpdateTournamentRankDto,
} from 'app/tournament/dto';
import { PAGE_SIZE } from 'app/constants';
import { IPaginate } from 'types/paginate';

@Injectable()
export class TournamentRankService implements ITournamentRankService {
  constructor(
    @InjectRepository(TournamentRank)
    private readonly _repository: Repository<TournamentRank>
  ) {}

  async createRank(
    data: CreateTournamentRankDto
  ): Promise<GetTournamentRankDto> {
    const rank = this._repository.create({ ...data });

    await this._repository.save(rank);

    return {
      ...rank,
      tournamentId: rank.tournament.id,
    };
  }

  async getAll(
    page?: number,
    limit?: number
  ): Promise<IPaginate<GetTournamentRankDto>> {
    const take = limit || PAGE_SIZE;
    const skip = ((page || 1) - 1) * (limit || PAGE_SIZE);

    const [ranks, total] = await this._repository.findAndCount({ take, skip });

    return {
      page: page || 1,
      limit: limit || PAGE_SIZE,
      total,
      data: ranks.map((r) => ({ ...r, tournamentId: r.tournament.id })),
    };
  }

  async updateRank(
    id: string,
    data: UpdateTournamentRankDto
  ): Promise<GetTournamentRankDto> {
    const rank = await this._repository.findOne({ where: { id } });

    if (!rank) {
      throw new HttpException(
        `Tournament with id ${id} not found!`,
        HttpStatus.BAD_REQUEST
      );
    }

    const newRank = { ...rank, ...data };

    await this._repository.save(newRank);

    return {
      ...newRank,
      tournamentId: newRank.tournament.id,
    };
  }
}
