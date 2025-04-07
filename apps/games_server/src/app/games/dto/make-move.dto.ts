import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class MakeMoveDto {
  @ApiProperty({ example: 5 })
  @IsNumber()
  @Min(0)
  x: number;

  @ApiProperty({ example: 7 })
  @IsNumber()
  @Min(0)
  y: number;
} 