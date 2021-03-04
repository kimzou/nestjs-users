import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  name: string;
  email: string;
  password: string;
  firebaseUid: string;
}