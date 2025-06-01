import { Message } from 'app/chat/entities/message.entity';
import { AbstractEntity } from 'common/abstract-entity';
import { Column, Entity, OneToMany } from 'typeorm';

export enum ChatRoomType {
  PUBLIC = 'public',
  GAME = 'game',
  TOURNAMENT = 'tournament'
}

@Entity('room')
export class Room extends AbstractEntity {
  @Column()
  name: string;

  @Column({ type: 'enum', enum: ChatRoomType, default: ChatRoomType.PUBLIC })
  type: ChatRoomType;

  @OneToMany(() => Message, (message) => message.room)
  messages: Message[];
}
