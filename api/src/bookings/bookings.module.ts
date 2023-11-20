import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { BookingSchema } from 'src/schemas/booking.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Booking', schema: BookingSchema }])],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
