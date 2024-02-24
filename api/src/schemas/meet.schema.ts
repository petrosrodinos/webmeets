import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { MeetType, MeetVisibilityTypes } from 'src/enums/meet';

@Schema()
export class Period {
  @Prop()
  from: string;
  @Prop()
  to: string;
}

const PeriodsSchema = SchemaFactory.createForClass(Period);

@Schema()
export class Hour {
  @Prop()
  day: string;

  @Prop({
    type: [PeriodsSchema],
  })
  periods: Period[];
}

const HoursSchema = SchemaFactory.createForClass(Hour);

@Schema()
export class Closure {
  @Prop()
  name: string;
  @Prop()
  from: string;
  @Prop()
  to: string;
  @Prop()
  description: string;
}

const ClosureSchema = SchemaFactory.createForClass(Closure);

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

  @Prop({ type: [Types.ObjectId], ref: 'Review' })
  reviews: Types.ObjectId[];

  @Prop({
    type: [ImageSchema],
    required: true,
  })
  images: Image[];

  @Prop()
  duration: number;

  @Prop({
    type: String,
    enum: MeetType,
  })
  type: MeetType;

  @Prop({
    type: String,
    enum: MeetVisibilityTypes,
    default: MeetVisibilityTypes.PUBLIC,
  })
  visibility: MeetVisibilityTypes;

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
  hours: Hour[];

  @Prop({
    type: [ClosureSchema],
    required: true,
  })
  closures: Closure[];
}

export const MeetSchema = SchemaFactory.createForClass(Meet);
