import { Module } from '@nestjs/common';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { UsersResolver } from './users/users.resolver';
import { UsersService } from './users/users.service';


@Module({
  imports: [
    GraphQLFederationModule.forRoot({
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
      autoSchemaFile: 'schema.graphql',
    }),
  ],
  providers: [UsersResolver, UsersService],
})

export class AppModule { }

