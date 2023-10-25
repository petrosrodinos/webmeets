import {
  IsNumber,
  IsString,
} from 'class-validator';
import { Category } from '../schemas/book.schema';

export class CreateBookDto {
  @IsString()
  readonly title: string;
  @IsString()
  readonly description: string;
  @IsString()
  readonly author: string;
  @IsNumber()
  readonly price: number;
  @IsString()
  readonly category: Category;
}
