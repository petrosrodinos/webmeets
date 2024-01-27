import { Module } from '@nestjs/common';
import { MeetService } from './meets.service';
import { MeetController } from './meets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MeetSchema } from 'src/schemas/meet.schema';
import { S3Service } from 'src/aws-s3/aws-s3.service';
import { HoursController } from './hours/hours.controller';
import { HoursService } from './hours/hours.service';
import { ClosuresController } from './closures/closures.controller';
import { ClosuresService } from './closures/closures.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Meet', schema: MeetSchema }])],
  exports: [MeetService],
  controllers: [MeetController, HoursController, ClosuresController],
  providers: [MeetService, HoursService, ClosuresService, S3Service],
})
export class MeetModule {}
