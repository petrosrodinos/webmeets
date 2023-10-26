import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

@Schema({
  timestamps: true,
})
export class User {
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

export const UserSchema =
  SchemaFactory.createForClass(User);
