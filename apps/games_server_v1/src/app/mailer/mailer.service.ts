import { Injectable } from '@nestjs/common';
import {
  MailerService as _MailerService,
  ISendMailOptions,
} from '@nestjs-modules/mailer';
import { IMailService } from './interfaces/mail-services.interface';

@Injectable()
export class MailerService implements IMailService {
  constructor(private readonly _mailerService: _MailerService) {}

  async sendResetPasswordEmail(to: string, resetLink: string): Promise<void> {
    const subject = '___ reset password email!';
    const html = `
      <h5>Please click below link to reset your password</h5>
      <a href=${resetLink}>${resetLink}</a>
    `;

    await this._mailerService.sendMail({
      to,
      subject,
      html,
    });
  }

  async sendActivateEmail(to: string, activateLink: string): Promise<void> {
    const subject = '___ activation email!';
    const html = `
      <h5>Please click below link to activate user</h5>
      <a href=${activateLink}>${activateLink}</a>
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
