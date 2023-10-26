import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [JwtModule.register({}), MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
