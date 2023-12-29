import { IsString, IsArray } from 'class-validator';

export class CreateHourDto {
  @IsString()
  day: string;

  @IsArray()
  periods: CreatePeriodDto[];
}

export class CreatePeriodDto {
  @IsString()
  from: string;

  @IsString()
  to: string;
}
