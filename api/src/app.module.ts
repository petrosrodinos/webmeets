import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileModule } from './profiles/profiles.module';
import { AwsS3Module } from './aws-s3/aws-s3.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MeetModule } from './meets/meets.module';

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
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
