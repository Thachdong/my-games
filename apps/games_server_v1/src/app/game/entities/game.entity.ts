import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Move } from './move.entity';
import { Tournament } from '../../tournament/entities/tournament.entity';

@Entity('game')
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @ManyToMany(() => User, (user) => user.games)
  players: User[];

  @Column({ nullable: true })
  tournament?: Tournament;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column()
  winner: User;

  @Column()
  isDraw: boolean;

  @Column()
  winnerScoreGain: number;

  @Column()
  loserScoreGain: number;

  @Column()
  moves: Move[];

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
