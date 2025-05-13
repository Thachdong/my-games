import { Injectable } from "@nestjs/common";
import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { GetUserDto } from "../../user/dto/get-user.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    })
  }

  async validate(email: string, password: string): Promise<GetUserDto | void> {
    const user = await this._authService.validateUser(email, password);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    return user;
  }
}
