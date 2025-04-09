import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'john.doe@example.com', required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'johnDoe', required: true })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'strongPassword123', required: true })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}