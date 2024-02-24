import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class MessageResponse {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  senderId: Types.ObjectId;

  @Prop()
  message: string;
}

const MessageResponseShema = SchemaFactory.createForClass(MessageResponse);
@Schema({
  timestamps: true,
})
export class Message {
  @Prop()
  name: string;

  @Prop()
  avatar: string;

  @Prop()
  type: string;

  @Prop({
    type: [MessageResponseShema],
    required: true,
  })
  messages: MessageResponse[];

  @Prop({ type: Types.ObjectId, ref: 'User' })
  members: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'Profile' })
  profileId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Meet' })
  meetId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Booking' })
  bookingId: Types.ObjectId;
}

export const MessageShema = SchemaFactory.createForClass(Message);
