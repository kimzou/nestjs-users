import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop({ type: MongooseSchema.Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
// export const UserModel = Mongoose.mo