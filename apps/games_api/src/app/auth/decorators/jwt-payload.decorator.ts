import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TFullJwtPayload } from 'types';

export const JwtPayload = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): TFullJwtPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);
