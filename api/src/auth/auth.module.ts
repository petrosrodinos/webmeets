import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema';
import { CreateJwtService } from './jwt/jwt.service';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { S3Service } from 'src/aws-s3/aws-s3.service';

@Module({
  imports: [JwtModule.register({}), MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, CreateJwtService, S3Service],
})
export class AuthModule {}
