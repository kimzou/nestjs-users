import { Args, Context, Mutation, Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.entity';
import { User as UserModel } from './user.model';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) { }

  @Query((returns) => User)
  getUser(@Args('id') id: string): Promise<UserModel|null> {
    return this.usersService.findById(id);
  }

  @Query((returns) => [User])
  getUsers(@Context() context): Promise<UserModel[]> {
    return this.usersService.all();
  }

  @Mutation(returns => User)
  createUser(@Args('createUserData') createUserData: CreateUserInput): Promise<UserModel> {
    return this.usersService.create(createUserData);
  }

  // fetch user from another service
  @ResolveReference()
  resolveReference(reference: { __typename: string, id: string }): Promise<UserModel> {
    if (reference.id === undefined) throw new Error('User not found')
    const { id } = reference;
    return this.usersService.findById(id);
  }
}
