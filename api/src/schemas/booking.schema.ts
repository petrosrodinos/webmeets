import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BookingActivityType, BookingStatuses } from 'src/enums/booking';

@Schema({
  timestamps: true,
})
export class Activity {
  @Prop({
    enum: Object.values(BookingActivityType),
  })
  type: string;
  @Prop()
  description: string;
  @Prop()
  role: string;
}

const ActivitySchema = SchemaFactory.createForClass(Activity);

@Schema({
  timestamps: true,
})
export class Participants {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;
}

const ParticipantsSchema = SchemaFactory.createForClass(Participants);

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

  @Prop()
  location: string;

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
    type: [ParticipantsSchema],
    default: [],
  })
  participants: Participants[];

  @Prop()
  paymentId: string;

  @Prop({
    type: [ActivitySchema],
  })
  activities: Activity[];
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
