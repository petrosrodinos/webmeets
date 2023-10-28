import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema';
import { CreateJwtService } from './jwt/jwt.service';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { S3Service } from 'src/aws-s3/aws-s3.service';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    // ThrottlerModule.forRootAsync({
    //   useFactory: (configService: ConfigService) => ({
    //     ttl: configService.getOrThrow('UPLOAD_RATE_TTL'),
    //     limit: configService.getOrThrow('UPLOAD_RATE_LIMIT'),
    //   }),
    //   inject: [ConfigService],
    // }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    CreateJwtService,
    S3Service,
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard,
    // },
  ],
})
export class AuthModule {}
