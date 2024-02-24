import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AwsS3Module } from './aws-s3/aws-s3.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { RoomsModule } from './rooms/rooms.module';
import { StripeModule } from './stripe/stripe.module';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/users/users.module';
import { ProfileModule } from './api/profiles/profiles.module';
import { MeetModule } from './api/meets/meets.module';
import { BookingsModule } from './api/bookings/bookings.module';
import { ReviewsModule } from './api/reviews/reviews.module';
import { MessagesModule } from './api/messages/messages.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: parseInt(process.env.UPLOAD_RATE_TTL),
        limit: parseInt(process.env.UPLOAD_RATE_LIMIT),
      },
    ]),
    MongooseModule.forRoot(process.env.MONGO_URL),
    AuthModule,
    UserModule,
    ProfileModule,
    AwsS3Module,
    MeetModule,
    BookingsModule,
    RoomsModule,
    StripeModule,
    ReviewsModule,
    MessagesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
