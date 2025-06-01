import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { EProvide } from 'common/constants';
import { EConfigKeys } from 'common/constants';
import { Message, Room } from 'app/chat/entities';
import { Game, Move } from 'app/game/entities';
import { User } from 'app/user/entities/user.entity';
import { Tournament, TournamentRank } from 'app/tournament/entities';
import { Logger } from '@nestjs/common';

export const databaseProvider = [
  {
    provide: EProvide.DATA_SOURCE,
    useFactory: async (configService: ConfigService) => {
      const options: DataSourceOptions = {
        type: 'postgres',
        host: configService.get(EConfigKeys.DB_HOST, 'localhost'),
        port: configService.get(EConfigKeys.DB_PORT) || 5435,
        username: configService.get(EConfigKeys.DB_USERNAME, 'dongt'),
        password: configService.get(EConfigKeys.DB_PASSWORD, 'dongt'),
        database: configService.get(EConfigKeys.DB_DATABASE, 'gomoku_v1'),
        entities: [
          Message,
          Room,
          User,
          Game,
          Move,
          Tournament,
          TournamentRank,
        ],
        synchronize: true,
      };

      Logger.log('Entities: =================================', options.entities);

      const dataSource = new DataSource(options);

      await dataSource.initialize();

      return dataSource;
    },
    inject: [ConfigService],
  },
];
