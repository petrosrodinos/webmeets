import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  bio: string;

  @IsArray()
  categories: string;

  @IsOptional()
  banner: string;

  @IsOptional()
  avatar: string;

  @IsString()
  @IsOptional()
  isOnline: boolean;

  @IsString()
  country: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  area: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsNumber()
  @IsOptional()
  postalCode: number;
}
