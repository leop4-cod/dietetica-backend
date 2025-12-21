import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HistoryLogDocument = HydratedDocument<HistoryLog>;

@Schema({ collection: 'view_history' })
export class HistoryLog {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    productId: string;

    @Prop({ default: Date.now })
    date: Date;
}

export const HistoryLogSchema = SchemaFactory.createForClass(HistoryLog);
