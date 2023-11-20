import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BookingTypes } from 'src/enums/booking';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  meetId: string;

  @IsString()
  @IsNotEmpty()
  profileId: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(BookingTypes)
  @IsOptional()
  status: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  participants: string;
}
