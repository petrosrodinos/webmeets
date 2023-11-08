import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Service {
  @Prop({ type: Types.ObjectId, ref: 'Profile' })
  profileId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  category: string;

  @Prop({
    certificates: [
      {
        _id: true,
        name: String,
        file: String,
      },
    ],
  })
  certificates: Array<{ _id: Types.ObjectId; name: string; file: string }>;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  banner: string;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
