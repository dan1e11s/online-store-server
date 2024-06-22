import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  images?: string[];

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  category: string;
}
