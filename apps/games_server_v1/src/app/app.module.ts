import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { GameModule } from './game/game.module';
import { TournamentModule } from './tournament/tournament.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Game } from './game/entities/game.entity';
import { Tournament } from './tournament/entities/tournament.entity';
import { TournamentRank } from './tournament/entities/tournament-rank.entity';
import { Move } from './game/entities/move.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.game-v1',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT, 10) || 5435,
        username: process.env.DB_USERNAME || 'dongt',
        password: process.env.DB_PASSWORD || 'dongt',
        database: process.env.DB_NAME || 'gomoku_v1',
        entities: [User, Tournament, TournamentRank, Move, Game],
        synchronize: true,
      }),
    }),
    TypeOrmModule,
    UserModule,
    GameModule,
    TournamentModule,
  ],
  exports: []
})
export class AppModule {}
