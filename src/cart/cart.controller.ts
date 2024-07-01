import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  @ApiOperation({ summary: 'Add product to cart' })
  @ApiResponse({
    status: 201,
    description: 'Product has been successfully added to the cart.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        productId: { type: 'number', example: 1 },
        quantity: { type: 'number', example: 1 },
      },
      required: ['productId', 'quantity'],
    },
  })
  async addToCart(@Body() body: { productId: number; quantity: number }) {
    return this.cartService.addToCart(body.productId, body.quantity);
  }

  @Get()
  @ApiOperation({ summary: 'Get all items in the cart' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  async getCartItems() {
    return this.cartService.getCartItems();
  }

  @Delete('remove/:id')
  @ApiOperation({ summary: 'Remove a product from the cart by ID' })
  @ApiResponse({
    status: 200,
    description: 'Product has been successfully removed from the cart.',
  })
  @ApiResponse({ status: 404, description: 'Product not found in the cart.' })
  @ApiParam({
    name: 'id',
    description: 'ID of the product to remove',
    example: 1,
  })
  async removeFromCart(@Param('id') productId: number) {
    return this.cartService.removeFromCart(productId);
  }

  @Delete('clear')
  @ApiOperation({ summary: 'Clear the cart' })
  @ApiResponse({
    status: 200,
    description: 'Cart has been successfully cleared.',
  })
  async clearCart() {
    return this.cartService.clearCart();
  }
}
