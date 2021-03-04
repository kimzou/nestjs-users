import { Module } from '@nestjs/common';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { Post } from './posts/post.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    GraphQLFederationModule.forRoot({
      buildSchemaOptions: {
        numberScalarMode: 'integer',
        orphanedTypes: [Post],

      },
      autoSchemaFile: 'schema.graphql',
      // authorize cookies to be send
      cors: {
        credentials: true,
        origin: 'http://localhost:3000'
      },
      context: ({ req, res }) => {
        console.log('context req.hearders', req.headers)
        const uid = req.headers?.['x-user-uid']
        console.log('context', { uid })
        // TODO: attach user to context
        return { req, res }
      }
    }),
    UsersModule,
  ],
})

export class AppModule { }

