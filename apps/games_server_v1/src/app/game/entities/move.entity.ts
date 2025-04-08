import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Game } from "./game.entity";

@Entity('move')
export class Move {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  userId: string;

  @Column()
  @ManyToOne(() => Game, (game) => game.moves)
  game: Game;
  @Column()
  timestamp: Date;

  @Column()
  positionX: number;

  @Column()
  positionY: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}