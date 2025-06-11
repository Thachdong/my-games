import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTournamentRankDto {
  @ApiProperty({ description: 'The ID of the tournament' })
  @IsNotEmpty()
  @IsString()
  tournamentId: string;

  @ApiProperty({ description: 'The ID of the user' })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ description: 'The rank number of the user in the tournament' })
  @IsNotEmpty()
  @IsNumber()
  rankNo: number;

  @ApiProperty({ description: 'The score of the user in the tournament' })
  @IsNotEmpty()
  @IsNumber()
  score: number;
}
