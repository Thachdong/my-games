import { Module } from '@nestjs/common';
import { TournamentController } from './tournament.controller';

@Module({
  imports: [],
  providers: [],
  exports: [],
  controllers: [TournamentController],
})
export class TournamentModule {}
