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

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;
}

const ActivitySchema = SchemaFactory.createForClass(Activity);

@Schema({
  timestamps: true,
})
export class Participant {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop()
  notes: string;
}

const ParticipantSchema = SchemaFactory.createForClass(Participant);

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
    type: String,
  })
  roomName: string;

  @Prop({
    type: [ParticipantSchema],
    default: [],
  })
  participants: Participant[];

  @Prop()
  paymentId: string;

  @Prop({
    type: [ActivitySchema],
  })
  activities: Activity[];
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
