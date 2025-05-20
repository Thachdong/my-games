import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString } from "class-validator";

export class CreateMoveDto {
  @ApiProperty({ description: "The ID of the user making the move" })
  @IsString()
  userId: string;

  @ApiProperty({ description: "The ID of the game" })
  @IsString()
  gameId: string;

  @ApiProperty({ description: "The X position of the move" })
  @IsString()
  positionX: number;

  @ApiProperty({ description: "The Y position of the move" })
  @IsString()
  positionY: number;

  @ApiProperty({ description: "The timestamp of the move" })
  @IsDate()
  timestamp: Date;
}
