import { ApiProperty } from '@nestjs/swagger';
import { GetUserDto } from '../../user/dto/get-user.dto';
import { IsString } from 'class-validator';

export class AuthenticatedUserDto extends GetUserDto {
  @ApiProperty({ description: 'Access token for the user', required: true })
  @IsString()
  accessToken: string;

  @ApiProperty({ description: 'Public chat room id', required: false })
  publicRoomId?: string;
}
