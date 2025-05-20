import { ChatController } from 'app/chat/chat.controller';
import { ChatGateway } from 'app/chat/chat.gateway';
import { Module } from '@nestjs/common';
import { ChatService } from 'app/chat/chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoom, ChatMessage } from 'app/chat/entities';
import { GameModule } from 'app/game/game.module';
import { AuthModule } from 'app/auth/auth.module';
import { UserModule } from 'app/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatRoom, ChatMessage]),
    GameModule,
    AuthModule,
    UserModule,
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
  exports: [ChatService],
})
export class ChatModule {}
