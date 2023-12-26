import { IsString, IsArray } from 'class-validator';

export class CreateHoursDto {
  @IsString()
  day: string;

  @IsArray()
  periods: CreatePeriodsDto[];
}

export class CreatePeriodsDto {
  @IsString()
  from: string;

  @IsString()
  to: string;
}
