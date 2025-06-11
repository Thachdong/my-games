import { IsString } from 'class-validator';

export class JoinChatRoomDto {
  @IsString()
  roomId: string;
}
