import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsDate, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { MoveDto } from './move.dto';
import { PlayerDto } from './player.dto';

export class GameDto {
  @ApiProperty({ description: 'The ID of the game' })
  @IsString()
  id: string;

  @ApiPropertyOptional({ description: 'The ID of the tournament' })
  @IsOptional()
  @IsString()
  tournamentId?: string;

  @ApiPropertyOptional({ description: 'The start time of the game', type: Date })
  @IsOptional()
  @IsDate()
  startTime?: Date;

  @ApiPropertyOptional({ description: 'The end time of the game', type: Date })
  @IsOptional()
  @IsDate()
  endTime?: Date;

  @ApiProperty({ description: 'The moves made in the game', type: [MoveDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MoveDto)
  moves: MoveDto[];

  @ApiPropertyOptional({ description: 'The ID of the winner' })
  @IsOptional()
  @IsString()
  winnerId?: string;

  @ApiPropertyOptional({ description: 'Whether the game ended in a draw' })
  @IsOptional()
  @IsBoolean()
  isDraw?: boolean;

  @ApiPropertyOptional({ description: 'The score gained by the winner' })
  @IsOptional()
  @IsNumber()
  winnerScoreGain?: number;

  @ApiPropertyOptional({ description: 'The score gained by the loser' })
  @IsOptional()
  @IsNumber()
  loserScoreGain?: number;

  @ApiPropertyOptional({ description: 'The date the game was created', type: Date })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiPropertyOptional({ description: 'The date the game was last updated', type: Date })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;

  @ApiPropertyOptional({ description: 'The players involved in the game', type: [PlayerDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PlayerDto)
  players?: PlayerDto[];
}
