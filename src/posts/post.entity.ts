import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
// @Directive('@key(fields: "authorId")') // wrong
// @Directive('@key(fields: "id authorId")') // wrong
export class Post {
  @Field((type) => ID)
  @Directive('@external')
  id: string;
  @Directive('@external')
  authorId: string;
  // @Directive('@external')
  // title: string;
}