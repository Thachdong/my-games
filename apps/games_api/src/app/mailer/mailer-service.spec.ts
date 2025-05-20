import { Test, TestingModule } from '@nestjs/testing';
import { MailerService } from './mailer.service';
import { MailerService as _MailerService } from '@nestjs-modules/mailer';
describe('MailerService', () => {
  let service: MailerService;
  let mailerService: _MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailerService,
        {
          provide: _MailerService,
          useValue: {
            sendMail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MailerService>(MailerService);
    mailerService = module.get<_MailerService>(_MailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendEmail', () => {
    it('should call mailerService.sendMail with correct parameters', async () => {
      const emailDetails = {
        to: 'test@example.com',
        subject: 'Test Subject',
        template: 'Test Text',
      };

      jest.spyOn(mailerService, 'sendMail').mockResolvedValueOnce(undefined);

      await service.sendMail(
        emailDetails.to,
        emailDetails.subject,
        emailDetails.template
      );

      expect(mailerService.sendMail).toHaveBeenCalledWith({
        to: emailDetails.to,
        subject: emailDetails.subject,
        template: emailDetails.template,
      });
    });

    it('should throw an error if mailerService.sendMail fails', async () => {
      const emailDetails = {
        to: 'test@example.com',
        subject: 'Test Subject',
        text: 'Test Text',
      };

      jest
        .spyOn(mailerService, 'sendMail')
        .mockRejectedValue(new Error('SendMail Error'));

      await expect(
        service.sendMail(
          emailDetails.to,
          emailDetails.subject,
          emailDetails.text
        )
      ).rejects.toThrow('SendMail Error');
    });
  });
});
