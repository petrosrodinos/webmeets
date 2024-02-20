import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BookingStatuses } from 'src/enums/booking';
import { Roles } from 'src/enums/roles';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  meetId: string;

  @IsString()
  @IsNotEmpty()
  profileId: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsOptional()
  @IsString()
  location: string;

  @IsString()
  @IsOptional()
  notes: string;

  @IsEnum(BookingStatuses)
  @IsOptional()
  status: string;

  @IsNotEmpty()
  participants: ParticipantDto[];
}

export class ParticipantDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsOptional()
  notes: string;
}

export class FindAvailabilityDto {
  @IsString()
  @IsNotEmpty()
  from: string;

  @IsString()
  @IsNotEmpty()
  to: string;
}

export class CancelBookingDto {
  @IsString()
  @IsOptional()
  reason: string;

  @IsEnum(Roles)
  @IsNotEmpty()
  role: string;
}
