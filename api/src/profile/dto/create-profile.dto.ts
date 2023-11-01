import { IsOptional, IsString, IsEmail, IsBase64 } from 'class-validator';

export class CreateProfileDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  bio: string;

  @IsOptional()
  banner: Express.Multer.File;

  @IsOptional()
  avatar: Express.Multer.File;

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
}
