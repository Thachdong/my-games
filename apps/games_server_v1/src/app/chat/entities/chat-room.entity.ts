import { ChatMessage } from 'app/chat/entities/chat-message.entity';
import { Game } from 'app/game/entities/game.entity';
import { AbstractEntity } from 'common/abstract-entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

export enum ChatRoomType {
  PUBLIC = 'public',
  GAME = 'game',
}

@Entity('chat_room')
export class ChatRoom extends AbstractEntity {
  @Column({ type: 'string' })
  name: string;

  @Column({ type: 'enum', enum: ChatRoomType, default: ChatRoomType.PUBLIC })
  type: ChatRoomType;

  @Column({ type: 'uuid', nullable: true })
  gameId?: string;

  @OneToOne(() => Game, { nullable: true })
  @JoinColumn()
  game?: Game;

  @OneToMany(() => ChatMessage, (message) => message.room)
  messages: ChatMessage[];
}
