import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CancelBookingDto, CreateBookingDto, FindAvailabilityDto, ParticipantDto } from './dto/create-booking.dto';
import { UpdateBookingDto, UpdateParticipantDto } from './dto/update-booking.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Booking } from 'src/schemas/booking.schema';
import { StripeService } from 'src/stripe/stripe.service';
import { MeetService } from '../meets/meets.service';
import { JwtGuard } from '../auth/guard';

@Controller('bookings')
@ApiTags('Booking')
export class BookingsController {
  constructor(
    private readonly bookingsService: BookingsService,
    private meetService: MeetService,
    private stripeService: StripeService,
  ) {}

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Booking })
  @Post()
  async create(@Req() req: Express.Request, @Body() createBookingDto: CreateBookingDto) {
    const userId = req.user.userId;

    const meet = await this.meetService.findOne(createBookingDto.meetId);
    if (meet.userId.toString() == userId) {
      throw new ForbiddenException('You cannot book your own meet.');
    }
    const { name, price } = meet;
    // const payment = await this.stripeService.createCheckoutSession({
    //   name,
    //   price,
    // });

    const booking = await this.bookingsService.create(createBookingDto, 'payment.id', req);

    return {
      booking,
      // payment,
    };
  }

  @ApiOkResponse({ type: Booking })
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Get()
  findAll(@Query() query: any, @Req() req: Express.Request) {
    const { userId, profileId } = req.user;
    if (query.profileId && profileId !== query.profileId) {
      throw new ForbiddenException('Unauthorized');
    }
    if (query.userId && userId !== query.userId) {
      throw new ForbiddenException('Unauthorized');
    }
    return this.bookingsService.findAll(query);
  }

  @ApiOkResponse({ type: Booking })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Booking })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto, @Req() req: Express.Request) {
    return this.bookingsService.update(id, updateBookingDto, req);
  }

  @UseGuards(JwtGuard)
  @ApiOkResponse({ type: Booking })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingsService.remove(id);
  }

  @ApiOkResponse({ type: Booking })
  @Get(':id/availability')
  findAvailability(@Query() query: FindAvailabilityDto, @Param('id') id: string) {
    return this.bookingsService.findAvailability(id, query);
  }

  @ApiOkResponse({ type: Booking })
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Post(':id/cancel')
  cancel(@Body() cancelBookingDto: CancelBookingDto, @Param('id') id: string, @Req() req: Express.Request) {
    return this.bookingsService.cancel(id, cancelBookingDto, req);
  }

  @ApiOkResponse({ type: Booking })
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Post(':id/join')
  joinRoom(@Param('id') id: string, @Req() req: Express.Request) {
    return this.bookingsService.join(id, req);
  }

  @ApiOkResponse({ type: Booking })
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Post(':id/participants')
  addParticipant(@Body() participantsDto: ParticipantDto, @Param('id') id: string) {
    return this.bookingsService.addParticipant(id, participantsDto);
  }

  @ApiOkResponse({ type: Booking })
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Patch(':id/participants/:participantId')
  updateParticipant(
    @Param('id') id: string,
    @Param('participantId') participantId: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.bookingsService.updateParticipant(id, participantId, updateParticipantDto);
  }

  @ApiOkResponse({ type: Booking })
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Delete(':id/participants/:participantId')
  removeParticipant(@Param('participantId') participantId: string, @Param('id') id: string) {
    return this.bookingsService.removeParticipant(id, participantId);
  }
}
