import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tournament, TournamentStatus } from './entities/tournament.entity';
import { GamesService } from '../games/games.service';

@Injectable()
export class TournamentsService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
    private readonly gamesService: GamesService,
  ) {}

  async createTournament(name: string, creatorId: string): Promise<Tournament> {
    const tournament = this.tournamentRepository.create({
      name,
      createdById: creatorId,
      status: TournamentStatus.UPCOMING,
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    });
    return this.tournamentRepository.save(tournament);
  }

  async getTournament(id: string): Promise<Tournament> {
    const tournament = await this.tournamentRepository.findOne({
      where: { id },
      relations: ['games'],
    });
    if (!tournament) throw new NotFoundException(`Tournament ${id} not found`);
    return tournament;
  }
} 