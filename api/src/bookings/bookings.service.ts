import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Booking } from 'src/schemas/booking.schema';
import { Model, Error } from 'mongoose';

@Injectable()
export class BookingsService {
  constructor(
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
      return updatedBooking;
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
}
