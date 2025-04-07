import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Game } from '../../games/entities/game.entity';
import { ChatMessage } from './chat-message.entity';

export enum ChatRoomType {
  PUBLIC = 'public',
  GAME = 'game',
}

@Entity('chat_rooms')
export class ChatRoom {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: ChatRoomType, default: ChatRoomType.PUBLIC })
  type: ChatRoomType;

  @Column({ nullable: true })
  gameId: string;

  @ManyToOne(() => Game, { nullable: true })
  @JoinColumn()
  game: Game;

  @OneToMany(() => ChatMessage, message => message.room)
  messages: ChatMessage[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 