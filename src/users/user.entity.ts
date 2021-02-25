import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
// turns to an entity so it can be extended
@Directive('@key(fields: "id")')
export class User {
  @Field((type) => ID)
  id: string;
  name: string;
  email: string;
  password: string;
  firebaseUid: string;
}