import { ISendMailOptions } from "@nestjs-modules/mailer";

export interface IMailService {
  sendMail(
    to: string,
    subject: string,
    template: string,
    options?: Omit<ISendMailOptions, "to" | "subject" | "template">
  ): Promise<void>;
  sendActivateEmail(to: string, activateLink: string): Promise<void>;
  sendResetPasswordEmail(to: string, resetLink: string): Promise<void>;
}
