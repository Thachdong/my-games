import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule as _MailerModule } from '@nestjs-modules/mailer';
import { MailerService } from './mailer.service';
import { EConfigKeys } from 'common/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.game-v1',
      isGlobal: true,
    }),
    _MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>(EConfigKeys.MAILER_HOST, 'localhost'),
          port: Number(configService.get<string>(EConfigKeys.MAILER_PORT, '587')),
          secure: true,
          auth: {
            user: configService.get<string>(EConfigKeys.MAILER_USERNAME),
            pass: configService.get<string>(EConfigKeys.MAILER_PASSWORD),
          },
        },
      }),
    }),
  ],
  controllers: [],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
