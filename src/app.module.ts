import { Module } from '@nestjs/common';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { authMiddleware } from './auth/auth.middleware';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    GraphQLFederationModule.forRoot({
      buildSchemaOptions: {
        numberScalarMode: 'integer',
        fieldMiddleware: [authMiddleware]
      },
      autoSchemaFile: 'schema.graphql',
      // authorize cookies to be send
      cors: {
        credentials: true,
        origin: 'http://localhost:3000'
      },
      context: ({ req, res }) => {
        const session = req.headers.authorization || ''
        // TODO: decode user
        return { req, res }
      }
    }),
    UsersModule,
  ],
})

// @Module({
//   imports: [
//     MongooseModule.forRoot('mongodb://localhost/nest'),
//     GraphQLFederationModule.forRootAsync({
//       useFactory: async () => ({
//         buildSchemaOptions: {
//           numberScalarMode: 'integer',
//         },
//         autoSchemaFile: 'schema.graphql',
//       })
//     }),
//     UsersModule,
//   ],
// })

export class AppModule { }

