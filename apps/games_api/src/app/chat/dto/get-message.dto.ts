import { ApiProperty } from "@nestjs/swagger";

class SenderDto {
  @ApiProperty({
    description: "The ID of the user",
  })
  id: string;

  @ApiProperty({
    description: "The name of the user",
  })
  username: string;
}

export class GetMessageDto {
  @ApiProperty({
    description: "The ID of the message",})
  id: string;

  @ApiProperty({
    description: "The ID of the chat room",
  })
  roomId: string;

  @ApiProperty({
    description: "The sender of the message",
  })
  sender: SenderDto;

  @ApiProperty({
    description: "The content of the message",
  })
  content: string;

  @ApiProperty({
    description: "The timestamp of when the message was sent",
  })
  createdAt: Date;
}
