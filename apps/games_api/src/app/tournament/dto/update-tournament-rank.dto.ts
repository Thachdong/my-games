import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTournamentRankDto {
  @ApiProperty({ description: 'The rank number of the user in the tournament' })
  @IsNumber()
  rankNo?: number;

  @ApiProperty({ description: 'The score of the user in the tournament' })
  @IsNumber()
  score?: number;
}
