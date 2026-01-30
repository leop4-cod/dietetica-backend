import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './cart.schema';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CartService {
    constructor(
        @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
        private productsService: ProductsService,
    ) { }

    async getCart(userId: string) {
        const cart = await this.cartModel.findOne({ user_id: userId }).exec();
        if (!cart) {
            return { items: [], total: 0 };
        }

    
        const enrichedItems: any[] = [];
        let total = 0;

        for (const item of cart.items) {
            const product = await this.productsService.findOne(item.product_id);
            if (product) {
                enrichedItems.push({
                    product_id: item.product_id,
                    nombre: product.nombre,
                    precio: product.precio,
                    cantidad: item.cantidad,
                    subtotal: Number(product.precio) * item.cantidad
                });
                total += Number(product.precio) * item.cantidad;
            } else {
                
                enrichedItems.push({
                    product_id: item.product_id,
                    cantidad: item.cantidad,
                    error: 'Product not found'
                });
            }
        }

        return {
            items: enrichedItems,
            total,
            user_id: userId
        };
    }

    async addToCart(userId: string, addToCartDto: AddToCartDto) {
        const { product_id, cantidad } = addToCartDto;

    
        const product = await this.productsService.findOne(product_id);
        if (!product) {
            throw new NotFoundException('Product not found');
        }

        const cart = await this.cartModel.findOne({ user_id: userId });

        if (!cart) {
            
            const newCart = new this.cartModel({
                user_id: userId,
                items: [{ product_id, cantidad }]
            });
            return newCart.save();
        } 
        else {
            const existingItemIndex = cart.items.findIndex(item => item.product_id === product_id);

            if (existingItemIndex > -1) {

                cart.items[existingItemIndex].cantidad += cantidad;
            } else {
                
                cart.items.push({ product_id, cantidad });
            }
            return cart.save();
        }
    }

    async removeFromCart(userId: string, productId: string) {
        const updatedCart = await this.cartModel.findOneAndUpdate(
            { user_id: userId },
            { $pull: { items: { product_id: productId } } },
            { new: true }
        );
        if (!updatedCart) {
            throw new NotFoundException('Cart not found');
        }
        return updatedCart;
    }

    async clearCart(userId: string) {
        return this.cartModel.findOneAndDelete({ user_id: userId });

    }
}
