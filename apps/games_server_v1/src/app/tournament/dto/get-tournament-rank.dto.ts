import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetTournamentRankDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  tournamentId: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', required: true })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: 1, required: true })
  @IsNumber()
  @IsNotEmpty()
  rankNo: number;

  @ApiProperty({ example: 10, required: true })
  @IsNumber()
  @IsNotEmpty()
  score: number;
}
