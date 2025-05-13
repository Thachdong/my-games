import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { Repository } from 'typeorm';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { TournamentRank } from './entities/tournament-rank.entity';
import { CreateTournamentRankDto } from './dto/create-tournament-rank.dto';
import { UpdateTournamentRankDto } from './dto/update-tournament-rank.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class TournamentService {
  constructor(
    @InjectRepository(Tournament)
    private readonly _tournamentRepository: Repository<Tournament>,
    @InjectRepository(TournamentRank)
    private readonly _rankRepository: Repository<TournamentRank>,
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>
  ) {}

  /**
   * Create tournament
   */
  async create(data: CreateTournamentDto): Promise<Tournament> {
    const tournament = this._tournamentRepository.create({ ...data });

    await this._tournamentRepository.save(tournament);

    return tournament;
  }

  /**
   * Get tournament
   */
  async getAll(): Promise<Tournament[]> {
    return this._tournamentRepository.find();
  }

  /**
   * Update tournament title
   */
  async updateTitle(id: string, title: string): Promise<Tournament> {
    const tournament = await this._tournamentRepository.findOne({
      where: { id },
    });

    if (!tournament) {
      throw new HttpException(
        `Can not find tournament with id ${id}`,
        HttpStatus.BAD_REQUEST
      );
    }

    const newTournament = { ...tournament, title };

    await this._tournamentRepository.save(newTournament);

    return { ...newTournament };
  }

  /**
   * Create tournament rank
   */
  async createRank(data: CreateTournamentRankDto): Promise<TournamentRank> {
    const rank = this._rankRepository.create({ ...data });

    await this._rankRepository.save(rank);

    return rank;
  }

  /**
   * Update rank
   */
  async updateRank(
    id: string,
    data: UpdateTournamentRankDto
  ): Promise<TournamentRank | void> {
    const rank = await this._rankRepository.findOne({ where: { id } });

    if (!rank) {
      throw new HttpException(
        `Tournament with id ${id} not found!`,
        HttpStatus.BAD_REQUEST
      );
    }

    const newRank = { ...rank, ...data };

    await this._rankRepository.save(newRank);

    return newRank;
  }

  /**
   * Player join
   */
  async playerJoin(tournamentId: string, userId: string): Promise<void> {
    const tournament = await this._tournamentRepository.findOne({ where: { id: tournamentId } });

    if (!tournament) {
      throw new HttpException(`Tournament with id ${tournamentId} not found!`, HttpStatus.BAD_REQUEST);
    }

    // Check if the user is already a player in the tournament
    if (tournament.players.some(player => player.id === userId)) {
      throw new HttpException(`User with id ${userId} is already a player in this tournament!`, HttpStatus.BAD_REQUEST);
    }

    // Add the new player to the tournament's players
    const userRef = this._userRepository.create({ id: userId })

    tournament.players.push(userRef)

    await this._tournamentRepository.save(tournament);
  }

  /**
   * Player leave
   */
  async playerLeave(tournamentId: string, userId: string): Promise<void> {
    const tournament = await this._tournamentRepository.findOne({ where: { id: tournamentId } });

    if (!tournament) {
      throw new HttpException(`Tournament with id ${tournamentId} not found!`, HttpStatus.BAD_REQUEST);
    }

    // Check if the user is a player in the tournament
    const playerIndex = tournament.players.findIndex(player => player.id === userId);
    if (playerIndex === -1) {
      throw new HttpException(`User with id ${userId} is not a player in this tournament!`, HttpStatus.BAD_REQUEST);
    }

    // Remove the player from the tournament's players
    tournament.players.splice(playerIndex, 1);

    await this._tournamentRepository.save(tournament);
  }
}
