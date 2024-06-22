import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  async addToCart(@Body() body: { productId: number; quantity: number }) {
    return this.cartService.addToCart(body.productId, body.quantity);
  }

  @Get()
  async getCartItems() {
    return this.cartService.getCartItems();
  }

  @Delete('remove/:id')
  async removeFromCart(@Param('id') productId: number) {
    return this.cartService.removeFromCart(productId);
  }

  @Delete('clear')
  async clearCart() {
    return this.cartService.clearCart();
  }
}
