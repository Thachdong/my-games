import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { Repository } from 'typeorm';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { User } from '../user/entities/user.entity';
import { ITournamentService } from 'app/tournament/interfaces';
import { GetTournamentDto } from 'app/tournament/dto';
import { IPaginate } from 'types/paginate';
import { PAGE_SIZE } from 'app/constants';

@Injectable()
export class TournamentService implements ITournamentService {
  constructor(
    @InjectRepository(Tournament)
    private readonly _tournamentRepository: Repository<Tournament>,
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>
  ) {}

  async create(data: CreateTournamentDto): Promise<GetTournamentDto> {
    const tournament = this._tournamentRepository.create({ ...data });

    await this._tournamentRepository.save(tournament);

    return tournament;
  }

  async getAll(
    page?: number,
    limit?: number
  ): Promise<IPaginate<GetTournamentDto>> {
    const take = limit || PAGE_SIZE;
    const skip = ((page || 1) - 1) * (limit || PAGE_SIZE);

    const [tournaments, total] = await this._tournamentRepository.findAndCount({
      take,
      skip,
    });

    return {
      page: page || 1,
      limit: limit || PAGE_SIZE,
      total,
      data: tournaments,
    };
  }

  async updateTitle(id: string, title: string): Promise<GetTournamentDto> {
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

  async playerJoin(tournamentId: string, userId: string): Promise<void> {
    const tournament = await this._tournamentRepository.findOne({
      where: { id: tournamentId },
    });

    if (!tournament) {
      throw new HttpException(
        `Tournament with id ${tournamentId} not found!`,
        HttpStatus.BAD_REQUEST
      );
    }

    // Check if the user is already a player in the tournament
    if (tournament.players.some((player) => player.id === userId)) {
      throw new HttpException(
        `User with id ${userId} is already a player in this tournament!`,
        HttpStatus.BAD_REQUEST
      );
    }

    // Add the new player to the tournament's players
    const userRef = this._userRepository.create({ id: userId });

    tournament.players.push(userRef);

    await this._tournamentRepository.save(tournament);
  }

  async playerLeave(tournamentId: string, userId: string): Promise<void> {
    const tournament = await this._tournamentRepository.findOne({
      where: { id: tournamentId },
    });

    if (!tournament) {
      throw new HttpException(
        `Tournament with id ${tournamentId} not found!`,
        HttpStatus.BAD_REQUEST
      );
    }

    // Check if the user is a player in the tournament
    const playerIndex = tournament.players.findIndex(
      (player) => player.id === userId
    );
    if (playerIndex === -1) {
      throw new HttpException(
        `User with id ${userId} is not a player in this tournament!`,
        HttpStatus.BAD_REQUEST
      );
    }

    // Remove the player from the tournament's players
    tournament.players.splice(playerIndex, 1);

    await this._tournamentRepository.save(tournament);
  }
}
