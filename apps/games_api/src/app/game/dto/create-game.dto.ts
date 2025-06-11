import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateGameDto {
  @ApiProperty({ description: 'The time of the game round in seconds' })
  @IsNumber()
  roundTime: number;
}
