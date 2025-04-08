import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { Game } from "../../game/entities/game.entity";

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;
  
  @Column()
  isActive: boolean;

  @Column()
  isEmailVerified: boolean;

  @Column()
  activationToken: string;

  @Column()
  roles: UserRole[];

  @Column()
  verificationToken: string;

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

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}