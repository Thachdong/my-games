import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class PlayerDto {
  @ApiProperty({ description: 'User id' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'Name of the player' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Score of the player' })
  @IsNumber()
  score: number;
}
