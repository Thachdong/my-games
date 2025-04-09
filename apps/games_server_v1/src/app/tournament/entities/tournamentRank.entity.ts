import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tournament } from './tournament.entity';

@Entity('tournament_rank')
export class TournamentRank {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Tournament, (tournament) => tournament.ranks)
  @JoinColumn()
  tournament: Tournament;

  @Column()
  userId: string;

  @Column()
  rankNo: number;

  @Column()
  score: number

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
