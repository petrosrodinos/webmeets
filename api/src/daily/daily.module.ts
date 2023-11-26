import { Module } from '@nestjs/common';
import { DailyService } from './daily.service';

@Module({
  exports: [DailyService],
  providers: [DailyService],
})
export class RoomsModule {}
