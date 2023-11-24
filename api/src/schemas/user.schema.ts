import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Roles } from 'src/enums/roles';

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
    description: 'Birth date of the user',
    format: 'date',
  })
  @Prop()
  birthDate: Date;

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
    enum: Object.values(Roles),
  })
  @Prop({
    type: String,
    enum: Object.values(Roles),
  })
  role: Roles;

  @Prop({
    type: String,
  })
  avatar: any;
}

export const UserSchema = SchemaFactory.createForClass(User);
