import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { BookingSchema } from 'src/schemas/booking.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { StripeService } from 'src/stripe/stripe.service';
import { MeetService } from 'src/meets/meets.service';
import { MeetSchema } from 'src/schemas/meet.schema';
import { S3Service } from 'src/aws-s3/aws-s3.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Booking', schema: BookingSchema }]),
    MongooseModule.forFeature([{ name: 'Meet', schema: MeetSchema }]),
  ],
  controllers: [BookingsController],
  providers: [BookingsService, StripeService, MeetService, S3Service],
})
export class BookingsModule {}
