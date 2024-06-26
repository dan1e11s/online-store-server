import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const newProduct = {
      title: createProductDto.title,
      description: createProductDto.description,
      images: createProductDto.images,
      price: +createProductDto.price,
      category: createProductDto.category,
    };
    return await this.productRepository.save(newProduct);
  }

  async findAll() {
    return await this.productRepository.find({
      order: {
        createdat: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
    });

    if (!product) throw new NotFoundException('Item not found!');

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) throw new NotFoundException('Item not found!');

    return await this.productRepository.update(id, updateProductDto);
  }

  async remove(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) throw new NotFoundException('Item not found!');

    return await this.productRepository.delete(id);
  }
  async findAllWithPagination(page: number, limit: number) {
    const products = await this.productRepository.find({
      order: {
        createdat: 'DESC',
      },
      take: limit,
      skip: (page - 1) * limit,
    });

    return products;
  }

  async findAllWithSearch(query: string) {
    const wildcardQuery = `%${query}%`;
    return await this.productRepository.find({
      where: [
        { title: ILike(wildcardQuery) },
        { description: ILike(wildcardQuery) },
        { category: ILike(wildcardQuery) },
      ],
    });
  }
}
