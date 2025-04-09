import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Move } from './move.entity';
import { AbstractEntity } from '../../../common/abstractEntity'
import { Tournament } from '../../tournament/entities/tournament.entity';

@Entity('game')
export class Game extends AbstractEntity {
  @ManyToMany(() => User, (user) => user.games)
  @JoinTable()
  players: User[];

  @ManyToOne(() => Tournament, (tournament) => tournament.games, { nullable: true })
  tournament?: Tournament;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column()
  winnerId: string;

  @Column()
  isDraw: boolean;

  @Column()
  winnerScoreGain: number;

  @Column()
  loserScoreGain: number;

  @OneToMany(() => Move, (move) => move.game)
  moves: Move[];
}
