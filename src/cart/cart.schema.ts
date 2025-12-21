import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CartDocument = Cart & Document;

export class CartItem {
    @Prop({ required: true })
    product_id: string;

    @Prop({ required: true, min: 1 })
    cantidad: number;
}

@Schema()
export class Cart {
    @Prop({ required: true, unique: true })
    user_id: string;

    @Prop({ type: [CartItem], default: [] })
    items: CartItem[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
