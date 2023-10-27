import { IsOptional, IsString, IsEmail, IsArray } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsArray()
  certificates: string[];

  @IsString()
  banner: string;
}
