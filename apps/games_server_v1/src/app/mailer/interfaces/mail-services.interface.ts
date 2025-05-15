import { ISendMailOptions } from "@nestjs-modules/mailer";

export interface IMailService {
  sendEmail(
    to: string,
    subject: string,
    template: string,
    options?: Omit<ISendMailOptions, "to" | "subject" | "template">
  ): Promise<void>;
}
