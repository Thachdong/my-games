import { ApiProperty } from '@nestjs/swagger';
import { ChatRoomType } from 'app/chat/entities';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ValidateIf } from 'class-validator';

export class CreateChatRoomDto {
  @ApiProperty({
    description: 'The name of the chat room',
  })
  @IsString({ message: 'name must be a string' })
  name: string;

  @ApiProperty({
    description: 'The type of the chat room',
    enum: ChatRoomType,
    default: ChatRoomType.PUBLIC,
  })
  @IsNotEmpty({ message: 'type must not be empty' })
  type: ChatRoomType;

  @ApiProperty({
    description: 'The ID of the game associated with the chat room',
    required: false,
  })
  @ValidateIf((o) => o.type !== ChatRoomType.PUBLIC)
  @IsNotEmpty({ message: 'gameId is required when type is not public' })
  @IsOptional()
  gameId?: string;
}
