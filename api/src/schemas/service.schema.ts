import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Service {
  @Prop({ type: Types.ObjectId, ref: 'Profile' })
  profileId: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  category: string[];

  @Prop()
  certificates: string[];

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  banner: string;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
