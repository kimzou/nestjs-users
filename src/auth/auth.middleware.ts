// import { Injectable, NestMiddleware } from '@nestjs/common';
import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

// @Injectable()
// export class AuthMiddleware implements NestMiddleware {
//   use(req: any, res: any, next: () => void) {
//     next();
//   }
// }

export const authMiddleware: FieldMiddleware = async (ctx: MiddlewareContext, next: NextFn) => {
  // get the request hearders (user id)
  // get the user object
  const { source, args, context, info } = ctx;
  // const { req } = context
  console.log('auth middleware', {source})
  console.log('info', info)

  // const { user } = ctx.context;
  // if (!user) throw new UnauthorizedException()
  return next();
}