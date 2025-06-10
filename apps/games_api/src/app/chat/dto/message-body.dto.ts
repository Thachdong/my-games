import { IsString, IsUUID } from 'class-validator';

export class MessageBodyDto {
  @IsString({ message: 'message must be a string' })
  message: string;

  @IsUUID('4', {
    message: 'roomId must be a valid UUID',
  })
  roomId: string;
}
