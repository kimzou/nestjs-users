import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Post } from 'src/posts/post.entity';

export type UserDocument = User & Document;
@Schema()
export class User {
  // @Prop({ type: MongooseSchema.Types.ObjectId })
  // _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  firebaseUid: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Post' }] })
  posts?: Post[]
}

export const UserSchema = SchemaFactory.createForClass(User);
