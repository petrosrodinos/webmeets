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

  @Prop({
    images: [
      {
        _id: true,
        name: String,
        file: String,
      },
    ],
  })
  images: Array<{ _id: Types.ObjectId; file: string }>;

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
  postalCode: string;
}

export const MeetSchema = SchemaFactory.createForClass(Meet);
