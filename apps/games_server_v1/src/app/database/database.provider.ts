import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { EProvide } from '../constants';

export const databaseProvider = [
  {
    provide: EProvide.DATA_SOURCE,
    useFactory: async (configService: ConfigService) => {
      const options: DataSourceOptions = {
        type: 'postgres',
        host: configService.get('DB_HOST') || 'localhost',
        port: configService.get('DB_PORT') || 5435,
        username: configService.get('DB_USERNAME') || 'dongt',
        password: configService.get('DB_PASSWORD') || 'dongt',
        database: configService.get('DB_NAME') || 'gomoku_v1',
        entities: [__dirname + '/../**/*.entity.{ts,js}'],
        synchronize: false,
      };

      const dataSource = new DataSource(options);

      await dataSource.initialize();

      return dataSource;
    },
    inject: [ConfigService],
  },
];
