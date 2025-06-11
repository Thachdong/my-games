import { User } from 'app/user/entities/user.entity';
import { Room } from 'app/chat/entities/room.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from 'common/abstract-entity';

@Entity('message')
export class Message extends AbstractEntity {
  @Column({ type: 'uuid' })
  roomId: string;

  @ManyToOne(() => Room, (room) => room.messages)
  @JoinColumn()
  room: Room;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @Column('text')
  content: string;
}
