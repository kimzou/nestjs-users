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
  password: string;
}

@InputType()
export class RegisterInput {
  @Field()
  name: string;
  email: string;
  password: string;
  uid: string
}

@InputType({
    description: 'The user objet in UserCredential object returned by createUserWithEmailAndPassword method'
})
export class FirebaseUserCredentialInput {
  @Field()
  uid: string;
  displayName?: string;
  email: string;
  emailVerified?: boolean;
}
