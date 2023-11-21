import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Booking } from 'src/schemas/booking.schema';
import { JwtGuard } from 'src/auth/guard';

@Controller('bookings')
@ApiTags('Booking')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Booking })
  @Post()
  create(@Req() req: Express.Request, @Body() createBookingDto: CreateBookingDto) {
    const userId = req.user.userId;

    return this.bookingsService.create(createBookingDto, userId);
  }

  @ApiOkResponse({ type: Booking })
  @Get()
  findAll(@Query() query: any) {
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
}
