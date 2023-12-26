import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { MeetType } from 'src/types/meet';

@Schema()
export class Periods {
  @Prop()
  from: string;
  @Prop()
  to: string;
}

const PeriodsSchema = SchemaFactory.createForClass(Periods);

@Schema()
export class Hours {
  @Prop()
  day: string;

  @Prop({
    type: [PeriodsSchema],
    required: true,
  })
  periods: Periods[];
}

const HoursSchema = SchemaFactory.createForClass(Hours);

@Schema()
export class Image {
  @Prop()
  file: string;
}

const ImageSchema = SchemaFactory.createForClass(Image);

@Schema({
  timestamps: true,
})
export class Meet {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Profile' })
  profileId: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  category: string;

  @Prop({
    type: [ImageSchema],
    required: true,
  })
  images: Image[];

  @Prop()
  duration: number;

  @Prop({
    default: 1,
  })
  rating: number;

  @Prop()
  type: MeetType;

  @Prop()
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

  @Prop({
    type: [HoursSchema],
    required: true,
  })
  hours: Hours[];
}

export const MeetSchema = SchemaFactory.createForClass(Meet);
