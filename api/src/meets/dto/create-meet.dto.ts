import { IsOptional, IsString, IsArray, Validate } from 'class-validator';
import { MeetType } from 'src/types/meet';
import { CreateHourDto } from '../hours/dto/create-hour.dto';
import { CreateClosureDto } from '../closures/dto/create-closure.dto';
import { IsNumberOrString } from 'src/validators/IsNumberOrString';

export class CreateMeetDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  category: string;

  @IsOptional()
  images: Express.Multer.File[];

  @Validate(IsNumberOrString)
  duration: string;

  @Validate(IsNumberOrString)
  maxParticipants: string;

  @Validate(IsNumberOrString)
  price: string;

  @IsString()
  type: MeetType;

  @IsString()
  @IsOptional()
  phone: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  area: string;

  @IsOptional()
  @IsString()
  postalCode: string;

  @IsArray()
  hours: CreateHourDto[];

  @IsArray()
  @IsOptional()
  closures: CreateClosureDto[];
}

export class RemoveImagesDto {
  @IsArray()
  images: string[];
}
