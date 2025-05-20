import { Column, Entity, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Game } from '../../game/entities/game.entity';
import { TournamentRank } from './tournament-rank.entity';
import { AbstractEntity } from '../../../common/abstract-entity'

@Entity('tournament')
export class Tournament extends AbstractEntity {
  @Column()
  title: string;

  @Column()
  creatorId: string;

  @OneToMany(() => Game, (game) => game.tournament)
  games: Game[];

  @ManyToMany(() => User, (user) => user.games)
  @JoinTable()
  players: User[];

  @OneToMany(() => TournamentRank, (rank) => rank.tournament)
  ranks: TournamentRank[];

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;
}
