import { Module } from '@nestjs/common';
import { MeetService } from './meets.service';
import { MeetController } from './meets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MeetSchema } from 'src/schemas/meet.schema';
import { S3Service } from 'src/aws-s3/aws-s3.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Meet', schema: MeetSchema }])],
  controllers: [MeetController],
  providers: [MeetService, S3Service],
})
export class MeetModule {}
