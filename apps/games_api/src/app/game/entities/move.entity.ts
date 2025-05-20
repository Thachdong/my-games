import { Column, Entity, ManyToOne } from "typeorm";
import { Game } from "./game.entity";
import { AbstractEntity } from "../../../common/abstract-entity";

@Entity('move')
export class Move extends AbstractEntity {
  @Column()
  userId: string;

  @ManyToOne(() => Game, (game) => game.moves)
  game: Game;

  @Column()
  timestamp: Date;

  @Column()
  positionX: number;

  @Column()
  positionY: number;
}
