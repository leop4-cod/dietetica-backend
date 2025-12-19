import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './cart.schema';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { ProductsService } from '../products/products.service'; // We might need this to validate product exists or get details for view

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

        // Optional: Enrich items with product details (name, price, etc.) for the view
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
                // Product might have been deleted. Should we remove it? 
                // For now, just show ID or skip.
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

        // Verify product exists and has enough stock?
        // Ideally checking stock here is good UX, but critical check is at sales.
        // Let's check existence at least.
        const product = await this.productsService.findOne(product_id);
        if (!product) {
            throw new NotFoundException('Product not found');
        }

        const cart = await this.cartModel.findOne({ user_id: userId });

        if (!cart) {
            // Create new cart
            const newCart = new this.cartModel({
                user_id: userId,
                items: [{ product_id, cantidad }]
            });
            return newCart.save();
        } else {
            // Check if item exists
            const existingItemIndex = cart.items.findIndex(item => item.product_id === product_id);

            if (existingItemIndex > -1) {
                // Update quantity
                // Depending on requirement, this could be "add to existing" or "replace". 
                // Usually "add to existing".
                cart.items[existingItemIndex].cantidad += cantidad;
            } else {
                // Add new item
                cart.items.push({ product_id, cantidad });
            }
            return cart.save();
        }
    }

    async removeFromCart(userId: string, productId: string) {
        return this.cartModel.findOneAndUpdate(
            { user_id: userId },
            { $pull: { items: { product_id: productId } } },
            { new: true }
        );
    }

    async clearCart(userId: string) {
        return this.cartModel.findOneAndDelete({ user_id: userId });
        // Or update items to []
        // return this.cartModel.findOneAndUpdate({ user_id: userId }, { items: [] });
    }
}
