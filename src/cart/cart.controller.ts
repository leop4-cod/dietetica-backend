import { Controller, Get, Post, Body, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SuccessResponseDto } from '../common/dto/response.dto';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Get()
    async getCart(@Request() req) {
        const userId = req.user.userId;
        const cart = await this.cartService.getCart(userId);
        return new SuccessResponseDto('Cart retrieved successfully', cart);
    }

    @Post()
    async addToCart(@Request() req, @Body() addToCartDto: AddToCartDto) {
        const userId = req.user.userId;
        const cart = await this.cartService.addToCart(userId, addToCartDto);
        return new SuccessResponseDto('Item added to cart successfully', cart);
    }

    @Delete(':productId')
    async removeFromCart(@Request() req, @Param('productId') productId: string) {
        const userId = req.user.userId;
        const cart = await this.cartService.removeFromCart(userId, productId);
        return new SuccessResponseDto('Item removed from cart successfully', cart);
    }
}
