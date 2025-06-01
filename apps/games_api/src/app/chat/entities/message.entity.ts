import { User } from "app/user/entities/user.entity";
import { Room } from "app/chat/entities/room.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { AbstractEntity } from "common/abstract-entity";

@Entity('message')
export class Message extends AbstractEntity {
  @Column()
  roomId: string;

  @ManyToOne(() => Room, (room) => room.messages)
  @JoinColumn()
  room: Room;

  @Column()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  content: string;
}
