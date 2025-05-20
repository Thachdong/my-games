import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { GameModule } from './game/game.module';
import { TournamentModule } from './tournament/tournament.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Game } from './game/entities/game.entity';
import { Tournament } from './tournament/entities/tournament.entity';
import { TournamentRank } from './tournament/entities/tournament-rank.entity';
import { Move } from './game/entities/move.entity';
import { JwtGuard } from './auth/guards/jwt.guard';
import { JwtStrategy } from './auth/passport-strategies/jwt.strategy';
import { MailerModule } from 'app/mailer/mailer.module';
import { EConfigKeys } from 'common/constants'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.game-api',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'postgres',
        host: process.env[EConfigKeys.DB_HOST] || 'localhost',
        port: parseInt(process.env[EConfigKeys.DB_PORT], 10) || 5435,
        username: process.env[EConfigKeys.DB_USERNAME] || 'dongt',
        password: process.env[EConfigKeys.DB_PASSWORD] || 'dongt',
        database: process.env[EConfigKeys.DB_DATABASE] || 'gomoku_v1',
        entities: [User, Tournament, TournamentRank, Move, Game],
        synchronize: true,
      }),
    }),
    TypeOrmModule,
    MailerModule,
    AuthModule,
    UserModule,
    GameModule,
    TournamentModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    JwtStrategy,
  ],
})
export class AppModule {}
