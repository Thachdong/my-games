import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTournamentTitleDto {
  @ApiProperty({ description: 'The title of the tournament' })
  @IsNotEmpty()
  @IsString()
  title: string;
}

export class TournamentPlayerDto {
  @ApiProperty({
    description: 'The ID of the user participating in the tournament',
  })
  @IsNotEmpty()
  @IsString()
  userId: string;
}
