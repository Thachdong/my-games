import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { GameModule } from './game/game.module';
import { TournamentModule } from './tournament/tournament.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.game-v1',
    }),
    DatabaseModule,
    UserModule,
    GameModule,
    TournamentModule,
  ],
})
export class AppModule {}
