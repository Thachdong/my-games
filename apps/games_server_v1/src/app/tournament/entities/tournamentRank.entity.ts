import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tournament } from "./tournament.entity";

@Entity('tournament_rank')
export class TournamentRank {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Tournament, (tournament) => tournament.rank)
  @JoinColumn()
  tournament: Tournament;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}