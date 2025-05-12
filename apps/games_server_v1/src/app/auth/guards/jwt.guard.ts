import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { EMetadataKeys } from "common/constants";
import { Observable } from "rxjs";

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private readonly _reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this._reflector.getAllAndOverride(EMetadataKeys.IS_PUBLIC, [context.getHandler(), context.getClass()]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}
