import { ApiProperty } from '@nestjs/swagger';
import { GetMessageDto } from 'app/chat/dto/get-message.dto';

export class GetChatRoomDto {
  @ApiProperty({
    description: 'The ID of the chat room',
  })
  id: string;

  @ApiProperty({ description: 'The name of the chat room' })
  name: string;

  @ApiProperty({ description: 'Messages in the chat room' })
  messages: GetMessageDto[];

  @ApiProperty({ description: 'Created at timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Updated at timestamp' })
  updatedAt: Date;
}
