import { IsOptional, IsString, IsEmail, IsArray, IsNumber } from 'class-validator';
import { MeetType } from 'src/types/meet';

export class CreateMeetDto {
  @IsString()
  serviceId: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  @IsOptional()
  images: {
    name: string;
    file: Express.Multer.File;
  }[];

  @IsOptional()
  @IsNumber()
  duration: number;

  @IsNumber()
  @IsOptional()
  maxParticipants: number;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsString()
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
  @IsNumber()
  postalCode: number;
}
