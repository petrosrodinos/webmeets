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

  async create(createBookingDto: CreateBookingDto, paymentId: string, req: Express.Request) {
    const { userId, profileId } = req.user;

    try {
      const existingBooking = await this.bookingModel.findOne({
        meetId: createBookingDto.meetId,
        date: createBookingDto.date,
      });
      if (existingBooking) {
        let isExistingParticipant: Participant;

        //if booking is created from meet owner
        if (existingBooking.profileId == profileId) {
          //check if any of createBookingDto.participants exist in existingBooking.participants
          existingBooking.participants.forEach((existingParticipant: Participant) => {
            createBookingDto.participants.forEach((participant: Participant) => {
              if (existingParticipant.userId == participant.userId) {
                isExistingParticipant = participant;
              }
            });
          });
          if (isExistingParticipant) {
            throw new ForbiddenException('A user is already a participant in this booking.');
          }
        } else {
          //if booking is created from user
          isExistingParticipant = existingBooking.participants.find((participant: Participant) => {
            return participant.userId == userId;
          });
          if (isExistingParticipant) {
            throw new ForbiddenException('You are already a participant in this booking.');
          }
        }

        const { participants, ..._ } = createBookingDto;

        existingBooking.participants.push(...participants);
        await existingBooking.save();
        return existingBooking;
      } else {
        // const { participants, ...restDto } = createBookingDto;
        const booking = new this.bookingModel({
          ...createBookingDto,
          paymentId,
        });
        // booking.participants.push(...participants);
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
        throw new NotFoundException(`Could not find booking.`);
      }
      return booking;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, updateBookingDto: UpdateBookingDto, req: Express.Request) {
    const { userId, profileId } = req.user;

    try {
      const booking = await this.bookingModel.findById(id);
      if (!booking) {
        throw new NotFoundException(`Could not find booking.`);
      }

      const role = profileId == booking.profileId ? Roles.ADMIN : Roles.USER;

      let newActivity = null;
      if (updateBookingDto.location && booking.location != updateBookingDto.location) {
        newActivity = {
          type: BookingActivityType.CHANGED_LOCATION,
          description: `Location changed  by ${role}, from ${booking.location} to ${updateBookingDto.location}`,
          role,
          userId,
        };
        booking.activities.push(newActivity);
      }

      if (updateBookingDto.date && booking.date != updateBookingDto.date) {
        newActivity = {
          type: BookingActivityType.RESCHEDULED,
          description: `Date changed by ${role}, from ${new Date(booking.date).toDateString()} to ${new Date(
            updateBookingDto.date,
          ).toDateString()}`,
          role,
          userId,
        };
        booking.activities.push(newActivity);
      }

      booking.location = updateBookingDto.location ? updateBookingDto.location : booking.location;
      booking.date = updateBookingDto.date ? updateBookingDto.date : booking.date;

      await booking.save();

      return booking.populate('userId meetId profileId', '-password');
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const deletedBooking = await this.bookingModel.findByIdAndDelete(id);
      if (!deletedBooking) {
        throw new NotFoundException(`Could not find booking.`);
      }
      return deletedBooking;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async cancel(bookingId: string, cancelBookingDto: CancelBookingDto, req: Express.Request) {
    const { reason, role } = cancelBookingDto;
    const { userId, profileId } = req.user;
    const booking = await this.bookingModel.findById(bookingId);
    if (!booking) {
      throw new NotFoundException('Could not find booking.');
    }

    const meet = await this.meetModel.findById(booking.meetId);

    const newActivity = {
      type: BookingActivityType.CANCELLED,
      description: `Booking cancelled by ${role} for reason: ${reason} at ${new Date().toUTCString()}`,
      role,
      userId,
    };

    booking.activities.push(newActivity);

    if (meet.maxParticipants == 1 || profileId == booking.profileId) {
      booking.status = BookingStatuses.CANCELLED;
      //send notification to all participants if cancelled by admin
    }

    //if cancelled by user, remove user from participants
    if (profileId != booking.profileId) {
      booking.participants = booking.participants.filter((participant: Participant) => {
        return participant.userId != userId;
      });
    }

    await booking.save();
    return booking.populate('userId meetId profileId', '-password');
  }

  async join(bookingId: string, req: Express.Request) {
    const { userId, profileId } = req.user;
    let room: any;
    const booking: any = await this.bookingModel.findById(bookingId).populate('userId meetId profileId', '-password');
    if (!booking) {
      throw new NotFoundException('Could not find booking.');
    }

    const isExistingParticipant = booking.participants.find((participant: Participant) => {
      return participant.userId == userId;
    });

    if (profileId && profileId != booking.profileId._id) {
      throw new ForbiddenException('You are not allowed to enter this booking.');
    }

    if (!isExistingParticipant && !profileId) {
      throw new ForbiddenException('You are not allowed to enter this booking.');
    }

    try {
      if (booking.roomName) {
        room = await this.dailyService.getRoom(booking.roomName);
      } else {
        if (profileId) {
          const roomSettings = {
            max_participants: booking.meetId.maxParticipants,
            nbf: new Date(booking.date).getTime(),
            exp: new Date(booking.date).getTime() + booking.meetId.duration * 6000,
          };
          room = await this.dailyService.createRoom(roomSettings);
          booking.roomName = room.name;
          await booking.save();
        }
      }
    } catch (error) {
      throw new Error(error);
    }

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
        date: new Date().toUTCString(),
        periods: ['12:00-13:00', '13:00-14:00', '14:00-15:00', '23:00-01:00'],
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
