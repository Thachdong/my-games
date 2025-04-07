import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Game } from './game.entity';

@Entity('moves')
export class Move {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Game, game => game.moves)
  @JoinColumn()
  game: Game;

  @Column()
  gameId: string;

  @ManyToOne(() => User)
  @JoinColumn()
  player: User;

  @Column()
  playerId: string;

  @Column()
  x: number;

  @Column()
  y: number;

  @Column()
  moveNumber: number;

  @CreateDateColumn()
  timestamp: Date;
} 