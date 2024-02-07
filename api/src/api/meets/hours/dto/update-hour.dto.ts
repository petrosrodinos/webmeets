import { PartialType } from '@nestjs/swagger';
import { CreateHourDto, CreatePeriodDto } from './create-hour.dto';

export class UpdateHourDto extends PartialType(CreateHourDto) {}

export class UpdatePeriodDto extends PartialType(CreatePeriodDto) {}
