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

  // @Mutation(returns => String)
  // session(@Args('idToken') idToken: string, @Context() ctx: GraphQLExecutionContext) {
  //   return this.usersService.session(idToken, ctx);
  // }
  // @ResolveReference()
  // resolveReference(reference: { __typename: string; id: number }): Promise<User> {
  //   return this.usersService.findById(reference.id);
  // }
  // to access it from other service
  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }): Promise<UserModel> {
    console.log('reference', reference)
    if (reference.id === undefined) throw new Error('User not found')
    const { id } = reference;
    return this.usersService.findById(id);
  }
}
