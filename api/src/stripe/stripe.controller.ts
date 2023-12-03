import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('hooks')
  create(@Request() request: any) {
    const event = request.body;

    switch (event.type) {
      case 'checkout.session.completed':
        const paymentIntent = event.data.object;
        console.log('intent', paymentIntent);
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
