import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Message {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  senderId: Types.ObjectId;

  @Prop()
  message: string;
}

const MessageShema = SchemaFactory.createForClass(Message);
@Schema({
  timestamps: true,
})
export class Chat {
  @Prop()
  name: string;

  @Prop()
  avatar: string;

  @Prop()
  type: string;

  @Prop({
    type: [MessageShema],
    required: true,
  })
  messages: Message[];

  @Prop({ type: [Types.ObjectId], ref: 'User' })
  members: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'Profile' })
  profileId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Meet' })
  meetId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Booking' })
  bookingId: Types.ObjectId;
}

export const ChatShema = SchemaFactory.createForClass(Chat);
