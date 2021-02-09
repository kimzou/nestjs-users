import { Field, InputType } from '@nestjs/graphql';

// @ObjectType()
// export class UserInterface {
//   id: Types.ObjectId;
//   name: string;
// }

@InputType()
export class CreateUserInput {
  @Field()
  name: string;
}

@InputType()
export class ListUserInput {
  id?: number;
  name?: string;
}