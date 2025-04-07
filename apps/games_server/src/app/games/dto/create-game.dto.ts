import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateGameDto {
  @ApiProperty({ example: 'My Game', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: false, default: false })
  @IsBoolean()
  @IsOptional()
  isPrivate?: boolean;

  @ApiProperty({ example: 'gamepass', required: false })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({ example: 20, default: 20 })
  @IsNumber()
  @IsOptional()
  @Min(10)
  @Max(60)
  roundTimeSeconds?: number;

  @ApiProperty({ example: 15, default: 15 })
  @IsNumber()
  @IsOptional()
  @Min(10)
  @Max(30)
  boardSize?: number;
} 