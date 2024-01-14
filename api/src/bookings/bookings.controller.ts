import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CancelBookingDto, CreateBookingDto, FindAvailabilityDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Booking } from 'src/schemas/booking.schema';
import { JwtGuard } from 'src/auth/guard';
import { MeetService } from 'src/meets/meets.service';
import { StripeService } from 'src/stripe/stripe.service';

@Controller('bookings')
@ApiTags('Booking')
export class BookingsController {
  constructor(
    private readonly bookingsService: BookingsService,
    private meetService: MeetService,
    private stripeService: StripeService,
  ) {}

  @ApiOkResponse({ type: Booking })
  @Get('availability')
  findAvailability(@Query() query: FindAvailabilityDto) {
    return this.bookingsService.findAvailability(query);
  }

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
    const payment = await this.stripeService.createCheckoutSession({
      name,
      price,
    });

    const booking = await this.bookingsService.create(createBookingDto, payment.id, userId);

    return {
      booking,
      payment,
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
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingsService.update(id, updateBookingDto);
  }

  @UseGuards(JwtGuard)
  @ApiOkResponse({ type: Booking })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingsService.remove(id);
  }

  @ApiOkResponse({ type: Booking })
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Post(':id/cancel')
  cancel(@Body() cancelBookingDto: CancelBookingDto, @Param('id') id: string) {
    return this.bookingsService.cancel(id, cancelBookingDto);
  }
}
