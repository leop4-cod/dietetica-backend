import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HistoryLogDocument = HydratedDocument<HistoryLog>;

@Schema({ collection: 'view_history', timestamps: true })
export class HistoryLog {
    @Prop({ required: true, index: true })
    userId: string;

    @Prop({ required: true, index: true })
    productId: string;

    @Prop({ default: Date.now })
    date: Date;
}

export const HistoryLogSchema = SchemaFactory.createForClass(HistoryLog);

HistoryLogSchema.index({ userId: 1, productId: 1 });