import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { DailyService } from 'src/daily/daily.service';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService, DailyService],
})
export class RoomsModule {}
