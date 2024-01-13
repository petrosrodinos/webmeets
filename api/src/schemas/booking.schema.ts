import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BookingStatuses } from 'src/enums/booking';

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
  notes: string;

  @Prop({
    type: String,
    enum: Object.values(BookingStatuses),
    default: BookingStatuses.PENDING,
  })
  status: BookingStatuses;

  @Prop({
    type: Date,
  })
  date: Date;

  @Prop({
    type: Number,
    default: 1,
  })
  participants: number;

  @Prop()
  paymentId: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
