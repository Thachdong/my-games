import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email of the user requesting password change',
    example: 'user@example.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Hash string received in the email to confirm password change',
    example: 'abc123xyz456',
  })
  confirmHash: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'New password for the user',
    example: 'newPassword@123',
  })
  password: string;
}
