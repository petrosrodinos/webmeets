import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Profile {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  bio: string;

  @Prop()
  banner: string;

  @Prop()
  avatar: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
