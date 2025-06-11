import { ChatController } from 'app/chat/chat.controller';
import { ChatGateway } from 'app/chat/chat.gateway';
import { Module } from '@nestjs/common';
import { ChatService } from 'app/chat/chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room, Message } from 'app/chat/entities';
import { GameModule } from 'app/game/game.module';
import { UserModule } from 'app/user/user.module';
import { User } from 'app/user/entities/user.entity';
import { AuthModule } from 'app/auth/auth.module';
import { TournamentModule } from 'app/tournament/tournament.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room, Message, User]),
    GameModule,
    UserModule,
    AuthModule,
    TournamentModule,
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
  exports: [ChatService, ChatGateway],
})
export class ChatModule {}
