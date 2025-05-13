import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsOptional, IsString } from "class-validator";

export class CreateGameDto {
  @ApiPropertyOptional({ description: "The ID of the tournament" })
  @IsOptional()
  @IsString()
  tournamentId?: string;

  @ApiProperty({ description: "The start time of the game" })
  @IsDate()
  startTime: Date;

  @ApiProperty({ description: "The end time of the game" })
  @IsDate()
  endTime: Date;
}
