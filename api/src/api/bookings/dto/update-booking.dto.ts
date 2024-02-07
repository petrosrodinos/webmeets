import { PartialType } from '@nestjs/swagger';
import { CreateBookingDto, ParticipantDto } from './create-booking.dto';

export class UpdateBookingDto extends PartialType(CreateBookingDto) {}

export class UpdateParticipantDto extends PartialType(ParticipantDto) {}
