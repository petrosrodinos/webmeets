import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator((data: string | undefined, ctx: ExecutionContext) => {
  const request: Express.Request = ctx.switchToHttp().getRequest();
  if (data) {
    if (data == '_id') {
      let id = request.user._id.toString();
      return id;
    }
    return request.user[data];
  }
  return request.user;
});
