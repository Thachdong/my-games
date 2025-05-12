import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class GetUserDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', required: true })
  id: string

  @ApiProperty({ example: 'john.doe@example.com', required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'johnDoe', required: true })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'admin', required: true })
  @IsString()
  roles: string[];

  @ApiProperty({ example: 'http://example.com/avatar.png', required: false })
  avatar?: string;

  @ApiProperty({ example: 1000, required: false })
  score?: number;

  @ApiProperty({ example: 0, required: false })
  gamesPlayed?: number;

  @ApiProperty({ example: 0, required: false })
  gamesWin?: number;

  @ApiProperty({ example: 0, required: false })
  gamesLost?: number;

  @ApiProperty({ example: 0, required: false })
  gamesDraw?: number;
}
