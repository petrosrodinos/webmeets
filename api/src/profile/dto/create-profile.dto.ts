import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

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
  banner: Express.Multer.File;

  @IsOptional()
  avatar: Express.Multer.File;

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

  @IsString()
  @IsOptional()
  postalCode: string;
}
