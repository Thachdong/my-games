import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Game } from '../../game/entities/game.entity';
import { TournamentRank } from './tournamentRank.entity';

@Entity('tournament')
export class Tournament {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  creatorId: string;

  @Column()
  @OneToMany(() => Game, (game) => game.tournament)
  games: Game[];

  @Column()
  @ManyToMany(() => User, (user) => user.games)
  players: User[];

  @OneToMany(() => TournamentRank, (rank) => rank.tournament)
  ranks: TournamentRank[];

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
