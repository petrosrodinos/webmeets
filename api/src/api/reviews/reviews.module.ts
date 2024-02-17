import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { ReviewSchema } from 'src/schemas/review.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingSchema } from 'src/schemas/booking.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Booking', schema: BookingSchema }]),
    MongooseModule.forFeature([{ name: 'Review', schema: ReviewSchema }]),
  ],

  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
