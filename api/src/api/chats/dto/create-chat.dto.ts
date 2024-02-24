import { IsArray, Validate, IsOptional, IsString, IsMongoId } from 'class-validator';
// import { IsMongoId } from 'src/validators/IsMongoId';

export class CreateChatDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  avatar: string;

  @IsString()
  @IsOptional()
  type: string;

  @IsMongoId()
  @IsOptional()
  profileId: string;

  @IsMongoId()
  @IsOptional()
  meetId: string;

  @IsMongoId()
  @IsOptional()
  bookingId: string;

  @IsArray()
  @IsMongoId({ each: true })
  members: string[];

  @IsArray()
  @IsOptional()
  messages: CreateMessageDto[];
}

export class CreateMessageDto {
  @IsString()
  senderId: string;

  @IsString()
  message: string;
}
