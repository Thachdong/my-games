import { Module } from '@nestjs/common';
import { TournamentController } from './tournament.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { TournamentRank } from './entities/tournament-rank.entity';
import { User } from '../user/entities/user.entity';
import { TournamentService } from './tournament.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tournament, TournamentRank, User])],
  providers: [TournamentService],
  exports: [],
  controllers: [TournamentController],
})
export class TournamentModule {}
