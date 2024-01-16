import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CancelBookingDto, CreateBookingDto, FindAvailabilityDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Booking } from 'src/schemas/booking.schema';
import { Model, Error } from 'mongoose';
import { Meet } from 'src/schemas/meet.schema';
import { BookingActivityType, BookingStatuses } from 'src/enums/booking';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Meet.name)
    private meetModel: Model<Meet>,
    @InjectModel(Booking.name)
    private bookingModel: Model<Booking>,
  ) {}

  async create(createBookingDto: CreateBookingDto, paymentId: string, userId: string) {
    try {
      const booking = new this.bookingModel({
        ...createBookingDto,
        userId,
        paymentId,
      });
      await booking.save();
      return booking;
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        throw new ForbiddenException(error.message);
      }
      throw error;
    }
  }

  async findAll(query: any) {
    try {
      const bookings = await this.bookingModel
        .find({
          ...query,
        })
        .populate('userId meetId profileId', '-password');
      if (!bookings || bookings.length === 0) {
        throw new NotFoundException('Could not find bookings.');
      }
      return bookings;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const booking = await this.bookingModel.findById(id).populate('userId meetId profileId', '-password');
      if (!booking) {
        throw new NotFoundException(`Booking with id ${id} not found.`);
      }
      return booking;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, updateBookingDto: UpdateBookingDto) {
    try {
      const updatedBooking = await this.bookingModel.findByIdAndUpdate(id, updateBookingDto, { new: true });
      if (!updatedBooking) {
        throw new NotFoundException(`Booking with id ${id} not found.`);
      }
      return updatedBooking.populate('userId meetId profileId', '-password');
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const deletedBooking = await this.bookingModel.findByIdAndDelete(id);
      if (!deletedBooking) {
        throw new NotFoundException(`Booking with id ${id} not found.`);
      }
      return deletedBooking;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async cancel(bookingId: string, cancelBookingDto: CancelBookingDto) {
    const { reason, role } = cancelBookingDto;
    const booking = await this.bookingModel.findById(bookingId);
    if (!booking) {
      throw new NotFoundException('Could not find booking.');
    }

    const newActivity = {
      type: BookingActivityType.CANCELLED,
      description: reason,
      role,
    };

    booking.activities.push(newActivity);

    booking.status = BookingStatuses.CANCELLED;

    await booking.save();
    return booking.populate('userId meetId profileId', '-password');
  }

  async findAvailability(meetId: string, query: FindAvailabilityDto) {
    const { from, to } = query;

    const meet = await this.meetModel.findById(meetId);

    if (!meet) {
      throw new NotFoundException('Could not find meet.');
    }

    const bookings = await this.bookingModel.find({
      meetId,
      // date: { $gte: from, $lte: to },
    });

    const openingHours = meet.hours;
    const closures = meet?.closures || [];

    const availability = [
      {
        date: '2024-01-19T22:00:00.000Z',
        periods: ['12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00'],
      },
      {
        date: '2024-01-20T22:00:00.000Z',
        periods: ['12:30-13:30', '13:30-14:30', '14:30-15:30', '15:30-16:30'],
      },
      {
        date: '2024-01-21T22:00:00.000Z',
        periods: [],
      },
      {
        date: '2024-01-22T22:00:00.000Z',
        periods: ['12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00'],
      },
    ];

    return {
      availability,
      query,
    };
  }
}
