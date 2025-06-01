import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule as _MailerModule } from '@nestjs-modules/mailer';
import { MailerService } from './mailer.service';
import { EConfigKeys } from 'common/constants';

@Module({
  imports: [
    _MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        Logger.log("configService.get<string>(EConfigKeys.MAILER_HOST)" + configService.get<string>(EConfigKeys.MAILER_HOST));
        return {
          transport: {
            host: configService.get<string>(EConfigKeys.MAILER_HOST),
            port: Number(
              configService.get<string>(EConfigKeys.MAILER_PORT, '587')
            ),
            secure: false,
            auth: {
              user: configService.get<string>(EConfigKeys.MAILER_USERNAME),
              pass: configService.get<string>(EConfigKeys.MAILER_PASSWORD),
            },
          },
        };
      },
    }),
  ],
  controllers: [],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
