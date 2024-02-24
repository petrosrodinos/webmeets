import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  avatar: string;

  @IsString()
  @IsOptional()
  type: string;

  @IsString()
  @IsOptional()
  profileId: string;

  @IsString()
  @IsOptional()
  meetId: string;

  @IsString()
  @IsOptional()
  bookingId: string;

  @IsArray()
  members: string[];

  @IsArray()
  messages: CreateMessageResponseDto[];
}

export class CreateMessageResponseDto {
  @IsString()
  senderId: string;

  @IsString()
  message: string;
}
