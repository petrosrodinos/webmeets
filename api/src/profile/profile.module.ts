import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileSchema } from 'src/schemas/profile.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Profile', schema: ProfileSchema }])],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
