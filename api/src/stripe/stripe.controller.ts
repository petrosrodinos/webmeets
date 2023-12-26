import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { BookingsService } from 'src/bookings/bookings.service';
import { BookingStatuses } from 'src/enums/booking';

@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private bookingService: BookingsService,
  ) {}

  @Post('hooks')
  async create(@Request() request: any) {
    const event = request.body;

    console.log('EVENT', event);

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log('session', session);
        try {
          const booking = await this.bookingService.findAll({ paymentId: session.id });
          const updated = this.bookingService.update(booking[0]._id.toString(), { status: BookingStatuses.CREATED });
          console.log('updated', updated);
        } catch (e) {
          return {
            received: true,
          };
        }
        break;
    }
    return {
      received: true,
    };
  }

  @Get()
  findAll() {
    return this.stripeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stripeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHookDto: UpdatePaymentDto) {
    return this.stripeService.update(id, updateHookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stripeService.remove(id);
  }
}
