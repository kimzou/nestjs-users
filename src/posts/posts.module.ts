import { Module } from '@nestjs/common';
import { UsersModule } from './../users/users.module';
// import { PostsResolver } from './posts.resolver';

@Module({
  imports: [UsersModule],
  // providers: [PostsResolver],
})
export class PostsModule {}
