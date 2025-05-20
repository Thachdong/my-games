import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsOptional } from "class-validator";
import { PlayerDto } from "./player.dto";

export class UpdateGameDto {
  @ApiProperty({ description: "The start time of the game" })
  @IsDate()
  @IsOptional()
  startTime?: Date;

  @ApiProperty({ description: "The end time of the game" })
  @IsDate()
  @IsOptional()
  endTime?: Date;

  @ApiProperty({ description: "Indicates if the game ended in a draw" })
  @IsOptional()
  isDraw?: boolean;

  @ApiProperty({ description: "The ID of the winner" })
  @IsOptional()
  winnerId?: string;

  @ApiProperty({ description: "The score gain of the winner" })
  @IsOptional()
  winnerScoreGain?: number;

  @ApiProperty({ description: "The score gain of the loser" })
  @IsOptional()
  loserScoreGain?: number;

  @ApiProperty({ description: "The players in the game" })
  @IsOptional()
  players?: PlayerDto[];
}
