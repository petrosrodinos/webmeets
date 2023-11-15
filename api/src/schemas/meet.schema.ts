import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { MeetType } from 'src/types/meet';

@Schema({
  timestamps: true,
})
export class Meet {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Profile' })
  profileId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Service' })
  serviceId: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  images: string[];

  @Prop()
  duration: number;

  @Prop()
  type: MeetType;

  @Prop({
    default: 100,
  })
  maxParticipants: number;

  @Prop()
  price: number;

  @Prop()
  phone: string;

  @Prop()
  address: string;

  @Prop()
  city: string;

  @Prop()
  area: string;

  @Prop()
  postalCode: number;
}

export const MeetSchema = SchemaFactory.createForClass(Meet);
