import { IsOptional, IsString, IsEmail, IsArray, IsNumber, IsBoolean } from 'class-validator';

export class CreateMeetDto {
  @IsString()
  serviceId: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  category: string;

  @IsArray()
  @IsOptional()
  images: string[];

  @IsString()
  @IsOptional()
  phone: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsNumber()
  duration: number;

  @IsOptional()
  @IsNumber()
  maxParticipants: number;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsBoolean()
  @IsOptional()
  isOnline: boolean;
}
