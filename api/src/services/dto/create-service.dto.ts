import { IsOptional, IsString, IsEmail, IsArray } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  category: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsArray()
  @IsOptional()
  certificates: {
    name: string;
    file: Express.Multer.File;
  }[];

  @IsOptional()
  banner: Express.Multer.File;
}
