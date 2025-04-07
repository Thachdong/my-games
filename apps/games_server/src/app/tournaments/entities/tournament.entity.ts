import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Game } from '../../games/entities/game.entity';

export enum TournamentStatus {
  UPCOMING = 'upcoming',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('tournaments')
export class Tournament {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ type: 'enum', enum: TournamentStatus, default: TournamentStatus.UPCOMING })
  status: TournamentStatus;

  @ManyToOne(() => User)
  @JoinColumn()
  createdBy: User;

  @Column()
  createdById: string;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'tournament_participants',
    joinColumn: { name: 'tournamentId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
  })
  participants: User[];

  @OneToMany(() => Game, game => game.tournament)
  games: Game[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 