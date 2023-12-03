import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';

@Module({
  exports: [StripeService],
  controllers: [StripeController],
  providers: [StripeService],
})
export class StripeModule {}
