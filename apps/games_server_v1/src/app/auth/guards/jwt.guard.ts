import { ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { TFullJwtPayload } from 'types';
import { EMetadataKeys } from 'common/constants';
import { Observable } from 'rxjs';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private readonly _reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this._reflector.getAllAndOverride(
      EMetadataKeys.IS_PUBLIC,
      [context.getHandler(), context.getClass()]
    );

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest<TUser = TFullJwtPayload>(
    error: unknown,
    user: TFullJwtPayload,
    info: unknown,
    context: ExecutionContext
  ): TUser {
    const request = context.switchToHttp().getRequest();
    const startAtCookie = request.cookies['startAt']?.toString();
    const jwtIat = user?.iat?.toString();

    if (jwtIat !== startAtCookie) {
      throw new HttpException("Unauthorized access", HttpStatus.UNAUTHORIZED);
    }

    return user as TUser;
  }
}
