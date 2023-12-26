import { PartialType } from '@nestjs/swagger';
import { CreateHoursDto, CreatePeriodsDto } from './create-hours.dto';

export class UpdateHoursDto extends PartialType(CreateHoursDto) {}

export class UpdatePeriodsDto extends PartialType(CreatePeriodsDto) {}
