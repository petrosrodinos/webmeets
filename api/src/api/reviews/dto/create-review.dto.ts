import { IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  meetId: string;

  @IsString()
  review: string;

  @IsNumber()
  rating: number;
}
