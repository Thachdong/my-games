import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class UpdateUserDto {
  @ApiProperty({ example: 'johnDoe', required: false })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({ example: 'strongPassword123', required: false })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({ example: 'user', required: false })
  @IsOptional()
  @IsString({ each: true })
  roles?: UserRole[];

  @ApiProperty({ example: 'avatar.jpg', required: false })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty({ example: 1000, required: false })
  @IsOptional()
  @IsNumber()
  score?: number;

  @ApiProperty({ example: 10, required: false })
  @IsOptional()
  @IsNumber()
  gamesPlayed?: number;

  @ApiProperty({ example: 5, required: false })
  @IsOptional()
  @IsNumber()
  gamesWin?: number;

  @ApiProperty({ example: 3, required: false })
  @IsOptional()
  @IsNumber()
  gamesLost?: number;
}
