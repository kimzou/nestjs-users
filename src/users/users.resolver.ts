import { Args, Context, GraphQLExecutionContext, Mutation, Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { AuthService } from './../auth/auth.service';
import { User } from './user.entity';
import { CreateUserInput, FirebaseUserCredentialInput } from './user.input';
import { User as UserModel } from './user.model';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
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

  // @Mutation(returns => String)// return token
  // login(@Args('loginInput') loginInput: LoginInput) {
  //   return this.usersService.login(loginInput);
  // }

  @Mutation(returns => String)
  login(
    @Args('idToken') idToken: string,
    @Context() ctx: GraphQLExecutionContext
  ) {
    return this.authService.login(idToken, ctx);
  }

  // @Mutation(returns => String)
  // register(@Args('registerInput') registerInput: RegisterInput) {
  //   return this.authService.register(registerInput);
  // }

  @Mutation(returns => String)
  register(
    @Args('firebaseUserCredentialInput') firebaseUserCredentialInput: FirebaseUserCredentialInput,
    @Args('idToken') idToken: string,
    @Context() ctx: GraphQLExecutionContext
  ) {
    return this.authService.register({ firebaseUserCredentialInput, idToken, ctx });
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
    const { id } = reference;
    return this.usersService.findById(id);
  }
}
