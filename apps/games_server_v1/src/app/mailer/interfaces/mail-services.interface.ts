import { ISendMailOptions } from "@nestjs-modules/mailer";

export interface IMailService {
  sendMail(
    to: string,
    subject: string,
    template: string,
    options?: Omit<ISendMailOptions, "to" | "subject" | "template">
  ): Promise<void>;
}
