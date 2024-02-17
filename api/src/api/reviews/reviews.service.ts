import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Booking, Participant } from 'src/schemas/booking.schema';
import { Model } from 'mongoose';
import { Review } from 'src/schemas/review.schema';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name)
    private reviewModel: Model<Review>,
    @InjectModel(Booking.name)
    private bookingModel: Model<Booking>,
  ) {}

  async create(createReviewDto: CreateReviewDto, userId: string) {
    const booking = await this.bookingModel.find({
      meetId: createReviewDto.meetId,
    });

    if (booking.length > 0) {
      const existInAnyBooking = booking.some((booking: Booking) => {
        return booking.participants.some((participant: Participant) => {
          return participant.userId == userId;
        });
      });
      if (!existInAnyBooking) {
        throw new ForbiddenException('You have to book this meet to create a review.');
      }
    } else {
      throw new ForbiddenException('You have to book this meet to create a review.');
    }

    const review = new this.reviewModel({
      ...createReviewDto,
      userId,
    });

    return review.save();
  }

  findAll() {
    return `This action returns all reviews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
