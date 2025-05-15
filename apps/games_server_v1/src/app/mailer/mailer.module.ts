import { Module } from "@nestjs/common";
import { MailerModule as _MailerModule } from "@nestjs-modules/mailer";
import { MailerService } from "./mailer.service";

@Module({
  imports: [_MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    }),],
  controllers: [],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
