import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReviewDocument = HydratedDocument<Review>;

@Schema({ collection: 'reviews' })
export class Review {
    @Prop({ required: true })
    productId: string;

    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    rating: number;

    @Prop()
    comentario: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
