import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
class Certificates {
  @Prop()
  name: string;

  @Prop()
  file: string;
}

const CertificatesSchema = SchemaFactory.createForClass(Certificates);

@Schema({
  timestamps: true,
})
export class Profile {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  bio: string;

  @Prop()
  categories: string[];

  @Prop()
  banner: string;

  @Prop()
  avatar: string;

  @Prop()
  country: string;

  @Prop({
    type: [CertificatesSchema],
  })
  certificates: Certificates[];

  @Prop()
  address: string;

  @Prop()
  area: string;

  @Prop()
  city: string;

  @Prop()
  postalCode: string;

  @Prop({
    default: false,
  })
  isOnline: boolean;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
