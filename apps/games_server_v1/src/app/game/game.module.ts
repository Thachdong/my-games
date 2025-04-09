import { Module } from '@nestjs/common';
import { GameController } from './game.controller';

@Module({
  imports: [],
  providers: [],
  exports: [],
  controllers: [GameController]
})
export class GameModule {}
