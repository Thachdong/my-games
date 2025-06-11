import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Game } from '../../game/entities/game.entity';
import { TournamentRank } from '../entities/tournament-rank.entity';
import { User } from '../../user/entities/user.entity';

export class GetTournamentDto {
  @ApiProperty({ example: 'uuid', required: true })
  id: string;

  @ApiProperty({ example: 'Champions League', required: true })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: '12345', required: true })
  @IsString()
  @IsNotEmpty()
  creatorId: string;

  @ApiProperty({
    example: '2023-10-01T10:00:00Z',
    required: true,
    type: String,
    format: 'date-time',
  })
  @IsDate()
  startTime: Date;

  @ApiProperty({
    example: '2023-10-31T10:00:00Z',
    required: true,
    type: String,
    format: 'date-time',
  })
  @IsDate()
  endTime: Date;

  @ApiProperty({ type: [Game] })
  games: Game[];

  @ApiProperty({ type: [TournamentRank] })
  ranks: TournamentRank[];

  @ApiProperty({ type: [User] })
  players: User[];

  @ApiProperty({ type: String, format: 'date-time' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ type: String, format: 'date-time' })
  @IsDate()
  updatedAt: Date;
}
