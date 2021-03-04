import { Args, Context, Mutation, Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { User } from './user.entity';
import { CreateUserInput } from './user.input';
import { User as UserModel } from './user.model';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
  ) { }

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

  // @ResolveReference()
  // resolveReference(reference: { __typename: string; id: number }): Promise<User> {
  //   return this.usersService.findById(reference.id);
  // }
  // find user of the post id
  // @ResolveField((of) => Post)
  // posts(@Parent() user: User): any {
  //   console.log('posts resolve field in user', {user})
  //   const { id } = user;
  //   return { __typename: 'Post', authorId: id };
  // }

  // to access it from other service
  @ResolveReference()
  resolveReference(reference: { __typename: string, id: string }): Promise<UserModel> {
    console.log('•••••• reference', reference)
    if (reference.id === undefined) throw new Error('User not found')
    const { id } = reference;
    return this.usersService.findById(id);
  }
}
