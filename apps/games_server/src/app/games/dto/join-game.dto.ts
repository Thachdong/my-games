import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class JoinGameDto {
  @ApiProperty({ example: 'gamepass', required: false })
  @IsString()
  @IsOptional()
  password?: string;
} 