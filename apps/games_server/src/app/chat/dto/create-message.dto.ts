import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({ example: 'Hello, everyone!' })
  @IsString()
  @IsNotEmpty()
  content: string;
} 