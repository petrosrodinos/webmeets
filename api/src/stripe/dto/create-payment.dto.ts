import { IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  name: string;

  @IsString()
  price: number;
}
