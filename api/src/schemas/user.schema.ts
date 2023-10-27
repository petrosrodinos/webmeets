import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
  master = 'master',
}

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ type: Types.ObjectId, ref: 'Profile' })
  profileId: Types.ObjectId;

  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  phone: string;

  @Prop()
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
