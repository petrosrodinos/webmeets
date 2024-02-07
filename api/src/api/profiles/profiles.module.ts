import { Module } from '@nestjs/common';
import { ProfileService } from './profiles.service';
import { ProfileController } from './profiles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileSchema } from 'src/schemas/profile.schema';
import { UserSchema } from 'src/schemas/user.schema';
import { S3Service } from 'src/aws-s3/aws-s3.service';
import { MeetSchema } from 'src/schemas/meet.schema';
import { UserService } from '../users/users.service';
import { MeetService } from '../meets/meets.service';
import { CreateJwtServiceModule } from '../auth/jwt/jwt.module';

@Module({
  imports: [
    CreateJwtServiceModule,
    MongooseModule.forFeature([{ name: 'Profile', schema: ProfileSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Meet', schema: MeetSchema }]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService, UserService, MeetService, S3Service],
})
export class ProfileModule {}
