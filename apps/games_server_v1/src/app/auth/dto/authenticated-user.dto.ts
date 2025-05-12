import { GetUserDto } from '../../user/dto/get-user.dto';

export class AuthenticatedUserDto extends GetUserDto {
  accessToken: string;
}
