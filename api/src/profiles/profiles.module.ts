import { Module } from '@nestjs/common';
import { ProfileService } from './profiles.service';
import { ProfileController } from './profiles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileSchema } from 'src/schemas/profile.schema';
import { UserSchema } from 'src/schemas/user.schema';
import { UserService } from 'src/users/users.service';
import { S3Service } from 'src/aws-s3/aws-s3.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Profile', schema: ProfileSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService, UserService, S3Service],
})
export class ProfileModule {}
