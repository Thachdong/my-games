import { Injectable } from '@nestjs/common';
import {
  MailerService as _MailerService,
  ISendMailOptions,
} from '@nestjs-modules/mailer';
import { IMailService } from './interfaces/mail-services.interface';

@Injectable()
export class MailerService implements IMailService {
  constructor(private readonly _mailerService: _MailerService) {}

  async sendEmail(
    to: string,
    subject: string,
    template: string,
    options?: Omit<ISendMailOptions, 'to' | 'subject' | 'template'>
  ): Promise<void> {
    await this._mailerService.sendMail({
      to,
      subject,
      template,
      ...options,
    });
  }
}
