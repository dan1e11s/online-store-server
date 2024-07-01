import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'The title of the product',
    example: 'Awesome T-Shirt',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The description of the product',
    example: 'A very comfortable and stylish t-shirt',
  })
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({
    description: 'Array of image URLs',
    example: ['http://example.com/image1.jpg'],
  })
  @IsOptional()
  images?: string[];

  @ApiProperty({
    description: 'The price of the product',
    example: 19,
  })
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'The category of the product',
    example: 'Mans',
  })
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    description: 'Sale percentage of the product',
    example: 10,
  })
  @IsNotEmpty()
  sale: number;

  @ApiProperty({
    description: 'Size of the product',
    example: 'M',
  })
  @IsNotEmpty()
  size: string;

  @ApiProperty({
    description: 'Color of the product',
    example: 'red',
  })
  @IsNotEmpty()
  color: string;

  @ApiProperty({
    description: 'Indicates if the product is new',
    example: true,
  })
  @IsNotEmpty()
  isNew: boolean;
}
