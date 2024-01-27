import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingSchema } from 'src/schemas/booking.schema';
import { MeetSchema } from 'src/schemas/meet.schema';
import { BookingsService } from 'src/api/bookings/bookings.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Booking', schema: BookingSchema }]),
    MongooseModule.forFeature([{ name: 'Meet', schema: MeetSchema }]),
  ],
  exports: [StripeService],
  controllers: [StripeController],
  providers: [StripeService, BookingsService],
})
export class StripeModule {}
