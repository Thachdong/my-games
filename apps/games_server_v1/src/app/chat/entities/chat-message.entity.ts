import { User } from "app/user/entities/user.entity";
import { ChatRoom } from "app/chat/entities/chat-room.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { AbstractEntity } from "common/abstract-entity";

@Entity('chat_messages')
export class ChatMessage extends AbstractEntity {
  @Column({ type: 'uuid' })
  roomId: string;

  @ManyToOne(() => ChatRoom, (room) => room.messages)
  @JoinColumn()
  room: ChatRoom;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @Column('text')
  content: string;
}
