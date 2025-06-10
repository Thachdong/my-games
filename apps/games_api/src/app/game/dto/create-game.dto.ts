import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateGameDto {
  @ApiPropertyOptional({ description: 'The ID of the tournament' })
  @IsOptional()
  @IsString()
  tournamentId?: string;

  @ApiProperty({ description: 'The start time of the game' })
  @IsDateString()
  startTime: string;

  @ApiProperty({ description: 'The end time of the game' })
  @IsDateString()
  endTime: string;
}
