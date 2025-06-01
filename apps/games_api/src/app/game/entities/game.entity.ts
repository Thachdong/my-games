import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'app/user/entities/user.entity';
import { Move } from './move.entity';
import { AbstractEntity } from 'common/abstract-entity'
import { Tournament } from 'app/tournament/entities/tournament.entity';

@Entity('game')
export class Game extends AbstractEntity {
  @ManyToMany(() => User, (user) => user.games)
  @JoinTable()
  players: User[];

  @ManyToOne(() => Tournament, (tournament) => tournament.games, { nullable: true })
  tournament: Tournament;

  @Column({ nullable: true })
  startTime: Date;

  @Column({ nullable: true })
  endTime: Date;

  @Column({ nullable: true })
  winnerId: string;

  @Column({ nullable: true })
  isDraw: boolean;

  @Column({ nullable: true })
  winnerScoreGain: number;

  @Column({ nullable: true })
  loserScoreGain: number;

  @OneToMany(() => Move, (move) => move.game)
  moves: Move[];
}
