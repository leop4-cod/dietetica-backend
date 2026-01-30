import { BadRequestException, Body, Controller, Delete, Get, Logger, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { SuccessResponseDto } from '../common/dto/response.dto';
import { OptionalJwtAuthGuard } from '../auth/optional-jwt-auth.guard';
import { isMongoId, isUUID } from 'class-validator';

@Controller('cart')
@UseGuards(OptionalJwtAuthGuard)
export class CartController {
    private readonly logger = new Logger(CartController.name);

    constructor(private readonly cartService: CartService) { }

    private isValidId(value?: string) {
        if (!value) return false;
        return isUUID(value) || isMongoId(value);
    }

    private resolveUserId(req: any, userIdFromBodyOrQuery?: string) {
        const userIdFromJwt = req?.user?.userId ?? req?.user?.id;
        const userId = userIdFromBodyOrQuery || userIdFromJwt;
        if (!this.isValidId(userId)) {
            throw new BadRequestException('user_id is required and must be a valid id');
        }
        return userId;
    }

    @Get()
    async getCart(@Request() req, @Query('user_id') userIdQuery?: string, @Body('user_id') userIdBody?: string) {
        const userId = this.resolveUserId(req, userIdQuery || userIdBody);
        const cart = await this.cartService.getCart(userId);
        return new SuccessResponseDto('Cart retrieved successfully', cart);
    }

    @Post()
    async addToCart(@Request() req, @Body() addToCartDto: AddToCartDto) {
        this.logger.log(`addToCart payload: ${JSON.stringify(addToCartDto)}`);
        if (!this.isValidId(addToCartDto.product_id)) {
            throw new BadRequestException('product_id must be a valid id');
        }
        const userId = this.resolveUserId(req, addToCartDto.user_id);
        const cart = await this.cartService.addToCart(userId, addToCartDto);
        return new SuccessResponseDto('Item added to cart successfully', cart);
    }

    @Delete(':productId')
    async removeFromCart(
        @Request() req,
        @Param('productId') productId: string,
        @Query('user_id') userIdQuery?: string,
        @Body('user_id') userIdBody?: string
    ) {
        if (!this.isValidId(productId)) {
            throw new BadRequestException('productId must be a valid id');
        }
        const userId = this.resolveUserId(req, userIdQuery || userIdBody);
        const cart = await this.cartService.removeFromCart(userId, productId);
        return new SuccessResponseDto('Item removed from cart successfully', cart);
    }
}
