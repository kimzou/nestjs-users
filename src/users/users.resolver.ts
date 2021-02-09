import { Args, Mutation, Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { User } from './user.entity';
import { CreateUserInput } from './user.inputs';
import { User as UserModel } from './user.model';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) { }

  @Query((returns) => User)
  getUser(@Args('id') id: string): Promise<UserModel> {
    return this.usersService.findById(id);
  }

  @Query((returns) => [User])
  getUsers(): Promise<UserModel[]> {
    return this.usersService.all();
  }

  // @ResolveReference()
  // resolveReferenceUsers(reference: { __typename: string; id: string }): Promise<UserModel[]> {
  //   console.log('reference', reference)
  //   return this.usersService.all();
  // }

  @Mutation(returns => User)
  createUser(@Args('createUserData') createUserData: CreateUserInput): Promise<UserModel> {
    console.log("mutation")
    return this.usersService.create(createUserData);
  }

  // @ResolveReference()
  // resolveReference(reference: { __typename: string; id: number }): Promise<User> {
  //   return this.usersService.findById(reference.id);
  // }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }): Promise<UserModel> {
    console.log('reference', reference)
    return this.usersService.findById(reference.id);
  }
}
