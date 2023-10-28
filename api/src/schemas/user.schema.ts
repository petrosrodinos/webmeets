import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty({
    description: 'The id of the profile',
    type: 'string',
    default: '653bfc52a89b4c7e9857b456',
  })
  profileId: Types.ObjectId;

  @ApiProperty({
    description: 'first name of the user',
    format: 'string',
  })
  @Prop()
  firstname: string;

  @ApiProperty({
    description: 'last name of the user',
    format: 'string',
  })
  @Prop()
  lastname: string;

  @ApiProperty({
    description: 'email of the user',
    format: 'string',
  })
  @Prop({ unique: true })
  email: string;

  @ApiProperty({
    description: 'password of the user',
    format: 'string',
  })
  @Prop()
  password: string;

  @ApiProperty({
    description: 'phone of the user',
    format: 'string',
  })
  @Prop()
  phone: string;

  @ApiProperty({
    description: 'role of the user',
    format: 'string',
  })
  @Prop()
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
