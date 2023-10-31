import { Module } from '@nestjs/common';
import { MeetService } from './meet.service';
import { MeetController } from './meet.controller';

@Module({
  controllers: [MeetController],
  providers: [MeetService],
})
export class MeetModule {}
