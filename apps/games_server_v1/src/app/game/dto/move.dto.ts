import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDate } from 'class-validator';

export class MoveDto {
  @ApiProperty({ description: 'Unique identifier for the move' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'Unique identifier for the user' })
  @IsString()
  userId: string;

  @ApiProperty({ description: 'Unique identifier for the game' })
  @IsString()
  gameId: string;

  @ApiProperty({ description: 'X-coordinate of the move' })
  @IsNumber()
  positionX: number;

  @ApiProperty({ description: 'Y-coordinate of the move' })
  @IsNumber()
  positionY: number;

  @ApiProperty({ description: 'Timestamp of the move' })
  @IsDate()
  timestamp: Date;

  @ApiProperty({ description: 'Creation timestamp of the move' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp of the move' })
  @IsDate()
  updatedAt: Date;
}
