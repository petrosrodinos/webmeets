import { IsOptional, IsString, IsEmail, IsArray, IsNumber, IsBoolean, IsEnum } from 'class-validator';
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
  images: string[];

  @IsOptional()
  @IsNumber()
  duration: number;

  @IsOptional()
  @IsNumber()
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
