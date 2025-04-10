import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateTournamentDto {
  @ApiProperty({ example: 'Champions League', required: true })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: '12345', required: true })
  @IsString()
  @IsNotEmpty()
  creatorId: string;

  @ApiProperty({ example: '2023-10-01T10:00:00Z', required: true, type: String, format: 'date-time' })
  @IsDate()
  startTime: Date;

  @ApiProperty({ example: '2023-10-31T10:00:00Z', required: true, type: String, format: 'date-time' })
  @IsDate()
  endTime: Date;
}