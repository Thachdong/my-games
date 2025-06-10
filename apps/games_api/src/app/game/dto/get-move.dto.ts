import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsUUID } from 'class-validator';

export class GetMoveDto {
  @ApiProperty({ description: 'The ID of the move' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'The ID of the user making the move' })
  @IsUUID()
  userId: string;

  @ApiProperty({ description: 'The ID of the game' })
  @IsUUID()
  gameId: string;

  @ApiProperty({ description: 'The X position of the move' })
  @IsNumber()
  positionX: number;

  @ApiProperty({ description: 'The Y position of the move' })
  @IsNumber()
  positionY: number;

  @ApiProperty({ description: 'The timestamp of the move' })
  @IsDate()
  timestamp: Date;
}
