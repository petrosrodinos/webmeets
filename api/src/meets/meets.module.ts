import { Module } from '@nestjs/common';
import { MeetService } from './meets.service';
import { MeetController } from './meets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MeetSchema } from 'src/schemas/meet.schema';
import { S3Service } from 'src/aws-s3/aws-s3.service';
import { UserSchema } from 'src/schemas/user.schema';
import { UserService } from 'src/users/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Meet', schema: MeetSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [MeetController],
  providers: [MeetService, UserService, S3Service],
})
export class MeetModule {}
