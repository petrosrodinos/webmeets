import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class StripeService {
  private domain = this.config.get('CLIENT_URL');
  private stripe = new Stripe(this.config.get('STRIPE_API_SECRET_KEY'));

  constructor(private config: ConfigService) {}

  async createCheckoutSession(data: CreatePaymentDto) {
    const session = await this.stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: data.name,
            },
            unit_amount: data.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${this.domain}?success=true`,
      cancel_url: `${this.domain}?canceled=true`,
    });

    return session;
  }

  findAll() {
    return `This action returns all stripe`;
  }

  findOne(id: string) {
    return `This action returns a #${id} stripe`;
  }

  update(id: string, updateStripeDto: any) {
    return `This action updates a #${id} stripe`;
  }

  remove(id: string) {
    return `This action removes a #${id} stripe`;
  }
}
