import { IsOptional, IsString, IsArray } from 'class-validator';
import { MeetType } from 'src/types/meet';
import { CreateHoursDto } from '../hours/dto/create-hours.dto';
import { CreateClosureDto } from '../closures/dto/create-closure.dto';

export class CreateMeetDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  category: string;

  @IsOptional()
  images: Express.Multer.File[];

  @IsString()
  duration: string;

  @IsString()
  maxParticipants: string;

  @IsString()
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
  hours: CreateHoursDto[];

  @IsArray()
  @IsOptional()
  closures: CreateClosureDto[];
}
