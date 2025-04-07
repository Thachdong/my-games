import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Move } from './move.entity';
import { Tournament } from '../../tournaments/entities/tournament.entity';

export enum GameStatus {
  WAITING = 'waiting',
  IN_PROGRESS = 'in_progress',
  FINISHED = 'finished',
  CANCELLED = 'cancelled',
}

export enum GameResult {
  PLAYER1_WIN = 'player1_win',
  PLAYER2_WIN = 'player2_win',
  DRAW = 'draw',
  CANCELLED = 'cancelled',
}

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ default: false })
  isPrivate: boolean;

  @Column({ nullable: true })
  password: string;

  @ManyToOne(() => User)
  @JoinColumn()
  player1: User;

  @Column()
  player1Id: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn()
  player2: User;

  @Column({ nullable: true })
  player2Id: string;

  @Column({ type: 'enum', enum: GameStatus, default: GameStatus.WAITING })
  status: GameStatus;

  @Column({ type: 'enum', enum: GameResult, nullable: true })
  result: GameResult;

  @Column({ default: 20 })
  roundTimeSeconds: number;

  @Column({ default: 15 })
  boardSize: number;

  @OneToMany(() => Move, move => move.game)
  moves: Move[];

  @ManyToOne(() => Tournament, { nullable: true })
  @JoinColumn()
  tournament: Tournament;

  @Column({ nullable: true })
  tournamentId: string;

  @Column({ nullable: true })
  winnerScore: number;

  @Column({ nullable: true })
  loserScore: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  finishedAt: Date;
} 