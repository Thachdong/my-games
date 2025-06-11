import { Module } from '@nestjs/common';
import { TournamentController } from 'app/tournament/tournament.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from 'app/tournament/entities/tournament.entity';
import { TournamentRank } from 'app/tournament/entities/tournament-rank.entity';
import { User } from 'app/user/entities/user.entity';
import { TournamentService } from 'app/tournament/tournament.service';
import { TournamentRankService } from 'app/tournament/tournament-rank.service';
import { TournamentRankController } from 'app/tournament/tournament-rank.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tournament, TournamentRank, User])],
  providers: [TournamentService, TournamentRankService],
  exports: [TournamentService],
  controllers: [TournamentController, TournamentRankController],
})
export class TournamentModule {}
