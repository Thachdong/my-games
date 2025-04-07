import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'John Doe', required: false })
  @IsOptional()
  fullName?: string;

  @ApiProperty({ example: 'password123', required: false })
  @IsOptional()
  @MinLength(6)
  currentPassword?: string;

  @ApiProperty({ example: 'newpassword123', required: false })
  @IsOptional()
  @MinLength(6)
  newPassword?: string;
} 