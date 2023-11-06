import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceSchema } from 'src/schemas/service.schema';
import { UserService } from 'src/user/user.service';
import { UserSchema } from 'src/schemas/user.schema';
import { S3Service } from 'src/aws-s3/aws-s3.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Service', schema: ServiceSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [ServicesController],
  providers: [ServicesService, UserService, S3Service],
})
export class ServicesModule {}
