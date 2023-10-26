import { IsEmail, IsOptional, IsString } from 'class-validator';

export class EditUserDto {
  @IsEmail()
  @IsOptional()
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly password: string;

  @IsString()
  @IsOptional()
  readonly firstname: string;

  @IsString()
  @IsOptional()
  readonly lastname: string;

  @IsString()
  @IsOptional()
  readonly phone: string;

  @IsString()
  @IsOptional()
  readonly role: string;
}
