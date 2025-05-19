import { ChatController } from "app/chat/chat.controller";
import { ChatGateway } from "app/chat/chat.gateway";
import { Module } from "@nestjs/common";
import { ChatService } from "app/chat/chat.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatRoom, ChatMessage } from "app/chat/entities";

@Module({
  imports: [TypeOrmModule.forFeature([ ChatRoom, ChatMessage ])],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
  exports: [ChatService],
})
export class ChatModule {}
