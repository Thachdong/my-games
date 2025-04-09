import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Game } from '../../game/entities/game.entity';
import { AbstractEntity } from "../../../common/abstractEntity"

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity('user')
export class User extends AbstractEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ nullable: true })
  verificationToken: string;

  @Column({ type: 'varchar', array: true, default: [] })
  roles: UserRole[];

  @Column({ nullable: true })
  avatar?: string;

  @Column({ default: 1000 })
  score: number;

  @Column({ default: 0 })
  gamesPlayed: number;

  @Column({ default: 0 })
  gamesWin: number;

  @Column({ default: 0 })
  gamesLost: number;

  @Column({ default: 0 })
  gamesDraw: number;

  @ManyToMany(() => Game, (game) => game.players)
  games: Game[];
}
