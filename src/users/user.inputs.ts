import { Field, InputType } from '@nestjs/graphql';

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

@InputType()
export class LoginInput {
  @Field()
  email: string;
  @Field()
  password: string;
}

@InputType()
export class RegisterInput {
  @Field()
  name?: string;
  @Field()
  email: string;
  @Field()
  password: string;
}
