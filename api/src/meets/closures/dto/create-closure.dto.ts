import { IsString } from 'class-validator';

export class CreateClosureDto {
  @IsString()
  name: string;

  @IsString()
  from: string;
  @IsString()
  to: string;
}
