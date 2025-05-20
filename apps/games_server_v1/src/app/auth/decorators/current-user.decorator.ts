import { GetUserDto } from "app/user/dto";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext): GetUserDto => {
  const request = ctx.switchToHttp().getRequest();

  return request.user;
})
