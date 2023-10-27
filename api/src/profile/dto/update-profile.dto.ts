import { PartialType } from '@nestjs/swagger';
import { CreateProfileDto } from './create-profile.dto';
import { IsString, IsEmail } from 'class-validator';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  bio: string;

  @IsString()
  banner: string;

  @IsString()
  avatar: string;
}
