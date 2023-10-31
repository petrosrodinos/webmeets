import { Module } from '@nestjs/common';
import { MeetService } from './meet.service';
import { MeetController } from './meet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MeetSchema } from 'src/schemas/meet.schema';
import { ProfileSchema } from 'src/schemas/profile.schema';
import { ProfileService } from 'src/profile/profile.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Meet', schema: MeetSchema }]),
    MongooseModule.forFeature([{ name: 'Profile', schema: ProfileSchema }]),
  ],
  controllers: [MeetController],
  providers: [MeetService, ProfileService],
})
export class MeetModule {}
