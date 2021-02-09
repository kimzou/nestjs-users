import { Module } from '@nestjs/common';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    GraphQLFederationModule.forRoot({
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
      autoSchemaFile: 'schema.graphql',
    }),
    UsersModule,
  ],
})

export class AppModule { }

