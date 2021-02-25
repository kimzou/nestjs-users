// import { Injectable, NestMiddleware } from '@nestjs/common';
import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

// @Injectable()
// export class AuthMiddleware implements NestMiddleware {
//   use(req: any, res: any, next: () => void) {
//     next();
//   }
// }

// TODO: get the uid from hearders and fetch the user associated & attach it to the context

export const authMiddleware: FieldMiddleware = async (ctx: MiddlewareContext, next: NextFn) => {
  // get the request hearders (user id)
  console.log('auth')
  // get the user object
  const { source, args, context, info } = ctx;
  // const { req } = context
  console.log('auth middleware', {context})

  // const { user } = ctx.context;
  // if (!user) throw new UnauthorizedException()
  return next();
}