import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetUserDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', required: true })
  @IsString()
  @IsNotEmpty()
  id: string

  @ApiProperty({ example: 'john.doe@example.com', required: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'johnDoe', required: true })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: true, required: true })
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @ApiProperty({ example: ['admin', 'user'], required: true })
  @IsString({ each: true })
  roles: string[];

  @ApiProperty({ example: 'http://example.com/avatar.png', required: false })
  @IsOptional()
  avatar?: string;

  @ApiProperty({ example: 1000, required: false })
  @IsOptional()
  @IsNumber()
  score?: number;

  @ApiProperty({ example: 0, required: false })
  @IsOptional()
  @IsNumber()
  gamesPlayed?: number;

  @ApiProperty({ example: 0, required: false })
  @IsOptional()
  @IsNumber()
  gamesWin?: number;

  @ApiProperty({ example: 0, required: false })
  @IsOptional()
  @IsNumber()
  gamesLost?: number;

  @ApiProperty({ example: 0, required: false })
  @IsOptional()
  @IsNumber()
  gamesDraw?: number;
}
