import { Injectable } from '@nestjs/common';
import {
  MailerService as _MailerService,
  ISendMailOptions,
} from '@nestjs-modules/mailer';
import { IMailService } from './interfaces/mail-services.interface';

@Injectable()
export class MailerService implements IMailService {
  constructor(private readonly _mailerService: _MailerService) {}

  async sendResetPasswordEmail(to: string, resetToken: string): Promise<void> {
    const subject = '___ reset password email!';
    const html = `
      <h5>Use the following token to reset your password:</h5>
      <p>${resetToken}</p>
    `;

    await this._mailerService.sendMail({
      to,
      subject,
      html,
    });
  }

  async sendActivateEmail(to: string, verificationToken: string): Promise<void> {
    const subject = '___ activation email!';
    const html = `
      <h5>Your activation code is: ${verificationToken}</h5>
    `;

    await this._mailerService.sendMail({
      to,
      subject,
      html,
    });
  }

  async sendMail(
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
