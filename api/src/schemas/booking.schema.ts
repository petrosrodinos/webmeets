import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BookingTypes } from 'src/enums/booking';

@Schema({
  timestamps: true,
})
export class Booking {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Meet' })
  meetId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Profile' })
  profileId: Types.ObjectId;

  @Prop()
  description: string;

  @Prop({
    type: String,
    enum: Object.values(BookingTypes),
    default: BookingTypes.PENDING,
  })
  status: BookingTypes;

  @Prop({
    type: Date,
  })
  date: Date;

  @Prop()
  participants: number;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
