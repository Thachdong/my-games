import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { TJwtPayload } from '../../../types/jwt';
import { ConfigService } from '@nestjs/config';
import { EConfigKeys } from 'common/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: _configService.get<string>(EConfigKeys.JWT_SECRET, 'your_jwt_secret'),
    });
  }

  async validate(payload: TJwtPayload) {
    return payload;
  }
}
