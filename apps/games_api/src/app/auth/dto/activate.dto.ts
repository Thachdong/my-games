import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class ActivateDto {
  @ApiProperty({ example: 'activation_token', required: true, type: 'string' })
  @IsString({ message: 'Verification code must be a string' })
  verificationCode: string;

  @ApiProperty({ example: 'user@example.com', required: true, type: 'string' })
  @IsEmail()
  email: string;
}
