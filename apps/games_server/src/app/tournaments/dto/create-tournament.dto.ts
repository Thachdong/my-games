import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTournamentDto {
  @ApiProperty({ example: 'Weekend Tournament' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'A weekend tournament for all skill levels', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: '2023-07-15T10:00:00.000Z' })
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({ example: '2023-07-16T18:00:00.000Z' })
  @IsDateString()
  @IsNotEmpty()
  endDate: string;
} 