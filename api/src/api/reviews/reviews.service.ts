import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Booking, Participant } from 'src/schemas/booking.schema';
import { Model } from 'mongoose';
import { Review } from 'src/schemas/review.schema';
import { Meet } from 'src/schemas/meet.schema';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name)
    private reviewModel: Model<Review>,
    @InjectModel(Booking.name)
    private bookingModel: Model<Booking>,
    @InjectModel(Meet.name)
    private meetModel: Model<Meet>,
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

    await review.save();

    const meet = await this.meetModel.findById(createReviewDto.meetId);

    meet.reviews.push(review._id);

    await meet.save();

    return review;
  }

  findAll(query: any) {
    const reviews: any = this.reviewModel
      .find({ ...query })
      .populate('userId', '-password -phone -email -birthDate')
      .sort({ createdAt: -1 });

    if (!reviews || reviews?.length < 0) {
      throw new NotFoundException('No reviews found');
    }

    return reviews;
  }

  update(id: string, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  async remove(id: string, userId: string) {
    const deletedReview = await this.reviewModel.findOneAndDelete({ _id: id, userId });

    if (!deletedReview) {
      throw new NotFoundException('Review not found');
    }

    const meet = await this.meetModel.findById(deletedReview.meetId);

    meet.reviews = meet.reviews.filter((review) => review.toString() != id);

    await meet.save();

    return deletedReview;
  }
}
