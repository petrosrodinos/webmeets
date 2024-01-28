import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CancelBookingDto, CreateBookingDto, FindAvailabilityDto, ParticipantDto } from './dto/create-booking.dto';
import { UpdateBookingDto, UpdateParticipantDto } from './dto/update-booking.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Booking, Participant } from 'src/schemas/booking.schema';
import { Model, Error } from 'mongoose';
import { Meet } from 'src/schemas/meet.schema';
import { BookingActivityType, BookingStatuses } from 'src/enums/booking';
import { Roles } from 'src/enums/roles';
import { DailyService } from 'src/daily/daily.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Meet.name)
    private meetModel: Model<Meet>,
    @InjectModel(Booking.name)
    private bookingModel: Model<Booking>,
    private dailyService: DailyService,
  ) {}

  async create(createBookingDto: CreateBookingDto, paymentId: string, userId: string) {
    try {
      const existingBooking = await this.bookingModel.findOne({
        meetId: createBookingDto.meetId,
        date: createBookingDto.date,
      });
      if (existingBooking) {
        const isExistingParticipant = existingBooking.participants.find((participant: Participant) => {
          return participant.userId == userId;
        });
        if (isExistingParticipant) {
          throw new ForbiddenException('You are already a participant in this booking.');
        }
        const { participants, ..._ } = createBookingDto;

        existingBooking.participants.push(...participants);
        await existingBooking.save();
        return existingBooking;
      } else {
        const { participants, ...restDto } = createBookingDto;
        const booking = new this.bookingModel({
          ...restDto,
          paymentId,
        });
        booking.participants.push(...participants);
        await booking.save();
        return booking;
      }
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        throw new ForbiddenException(error.message);
      }
      throw error;
    }
  }

  async findAll(query: any) {
    try {
      let bookings = null;
      if (query.userId) {
        bookings = await this.bookingModel
          .find({
            'participants.userId': query.userId,
          })
          .populate('meetId profileId participants.userId', '-password');
      } else {
        bookings = await this.bookingModel
          .find({
            ...query,
            // 'participants.0': { $exists: true },
          })
          .populate('meetId profileId participants.userId', '-password');
      }

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

  async cancel(bookingId: string, cancelBookingDto: CancelBookingDto, req: Express.Request) {
    const { reason, role } = cancelBookingDto;
    const { userId, role: userRole } = req.user;
    const booking = await this.bookingModel.findById(bookingId);
    if (!booking) {
      throw new NotFoundException('Could not find booking.');
    }

    const meet = await this.meetModel.findById(booking.meetId);

    const newActivity = {
      type: BookingActivityType.CANCELLED,
      description: reason,
      role,
    };

    booking.activities.push(newActivity);

    if (meet.maxParticipants == 1 || userRole == Roles.ADMIN) {
      booking.status = BookingStatuses.CANCELLED;
      //send notification to all participants if cancelled by admin
    }

    if (userRole == Roles.USER) {
      booking.participants = booking.participants.filter((participant: Participant) => {
        return participant.userId != userId;
      });
    }

    await booking.save();
    return booking.populate('userId meetId profileId', '-password');
  }

  async joinRoom(bookingId: string, req: Express.Request) {
    const { userId, profileId } = req.user;
    const booking = await this.bookingModel.findById(bookingId);
    if (!booking) {
      throw new NotFoundException('Could not find booking.');
    }

    const isExistingParticipant = booking.participants.find((participant: Participant) => {
      return participant.userId == userId;
    });

    console.log(isExistingParticipant, profileId, booking.profileId);

    if (!isExistingParticipant || (profileId && profileId != booking.profileId)) {
      throw new ForbiddenException('You are not allowed to enter this booking.');
    }

    const room = await this.dailyService.createRoom({});

    booking.populate('userId meetId profileId', '-password');

    return {
      room,
      booking,
    };
  }

  async addParticipant(bookingId: string, participantDto: ParticipantDto) {
    const { userId, notes } = participantDto;
    const booking = await this.bookingModel.findById(bookingId);
    if (!booking) {
      throw new NotFoundException('Could not find booking.');
    }

    const isExistingParticipant = booking.participants.find((participant: Participant) => {
      return participant.userId == userId;
    });
    if (isExistingParticipant) {
      throw new ForbiddenException('You are already a participant in this booking.');
    }

    const newParticipant = {
      userId,
      notes,
    };

    booking.participants.push(newParticipant);

    await booking.save();
    return booking.populate('userId meetId profileId', '-password');
  }

  updateParticipant = async (bookingId: string, participantId: string, participantDto: UpdateParticipantDto) => {
    const { notes } = participantDto;
    const booking = await this.bookingModel.findById(bookingId);
    if (!booking) {
      throw new NotFoundException('Could not find booking.');
    }

    const participantIndex = booking.participants.findIndex((participant: any) => {
      return participant._id == participantId;
    });

    if (participantIndex < 0) {
      throw new NotFoundException('Could not find participant.');
    }

    booking.participants[participantIndex].notes = notes;

    await booking.save();
    return booking.populate('userId meetId profileId', '-password');
  };

  removeParticipant = async (bookingId: string, participantId: string) => {
    const booking = await this.bookingModel.findById(bookingId);
    if (!booking) {
      throw new NotFoundException('Could not find booking.');
    }

    const participantIndex = booking.participants.findIndex((participant: any) => {
      return participant._id == participantId;
    });

    if (participantIndex < 0) {
      throw new NotFoundException('Could not find participant.');
    }

    booking.participants.splice(participantIndex, 1);

    await booking.save();
    return booking.populate('userId meetId profileId', '-password');
  };

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
