import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Cart)
    private cartItemsRepository: Repository<Cart>,
  ) {}

  async addToCart(productId: number, quantity: number) {
    const product = await this.productsRepository.findOne({
      where: { id: productId },
    });

    if (!product) throw new NotFoundException('Product not found!');

    let cartItem = await this.cartItemsRepository.findOne({
      where: {
        product: { id: productId },
      },
    });

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = this.cartItemsRepository.create({
        product,
        quantity,
      });
    }

    await this.cartItemsRepository.save(cartItem);
    return { ...cartItem, product };
  }

  async getCartItems() {
    return this.cartItemsRepository.find({
      relations: ['product'],
    });
  }

  async removeFromCart(productId: number) {
    return this.cartItemsRepository.delete({
      product: { id: productId },
    });
  }

  async clearCart() {
    return this.cartItemsRepository.clear();
  }
}
