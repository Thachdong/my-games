import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Tournament } from './tournament.entity';
import { AbstractEntity } from '../../../common/abstractEntity';

@Entity('tournament_rank')
export class TournamentRank extends AbstractEntity {
  @OneToOne(() => Tournament, (tournament) => tournament.ranks)
  @JoinColumn()
  tournament: Tournament;

  @Column()
  userId: string;

  @Column()
  rankNo: number;

  @Column()
  score: number;
}
