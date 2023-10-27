import { IsOptional, IsString, IsEmail } from 'class-validator';

export class CreateProfileDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  bio: string;

  @IsString()
  banner: string;

  @IsString()
  avatar: string;
}
