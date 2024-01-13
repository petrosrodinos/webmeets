import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BookingStatuses } from 'src/enums/booking';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  meetId: string;

  @IsString()
  @IsNotEmpty()
  profileId: string;

  @IsString()
  @IsOptional()
  notes: string;

  @IsOptional()
  @IsString()
  location: string;

  @IsEnum(BookingStatuses)
  @IsOptional()
  status: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsOptional()
  participants: string;
}

export class FindAvailabilityDto {
  @IsString()
  @IsNotEmpty()
  meetId: string;

  @IsString()
  @IsNotEmpty()
  from: string;

  @IsString()
  @IsNotEmpty()
  to: string;
}
