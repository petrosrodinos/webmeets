import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { ReviewSchema } from 'src/schemas/review.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingSchema } from 'src/schemas/booking.schema';
import { MeetSchema } from 'src/schemas/meet.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Booking', schema: BookingSchema }]),
    MongooseModule.forFeature([{ name: 'Review', schema: ReviewSchema }]),
    MongooseModule.forFeature([{ name: 'Meet', schema: MeetSchema }]),
  ],

  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
