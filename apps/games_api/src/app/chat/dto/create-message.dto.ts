import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({
    description: 'The ID of the chat room',
  })
  @IsUUID('4', { message: 'roomId must be a valid UUID' })
  roomId: string | null;

  @ApiProperty({
    description: 'The ID of the user sending the message',
  })
  @IsUUID('4', { message: 'userId must be a valid UUID' })
  userId: string;

  @ApiProperty({
    description: 'The content of the message',
  })
  @IsString({ message: 'content must be a string' })
  content: string;
}
