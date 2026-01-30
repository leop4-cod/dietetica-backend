import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PlanReservationDocument = HydratedDocument<PlanReservation>;

@Schema({ collection: 'plan_reservations', timestamps: true })
export class PlanReservation {
    @Prop({ required: true })
    planId: string;

    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    planObjetivo: string;

    @Prop({ required: true })
    planCalorias: number;

    @Prop({ default: 'pendiente' })
    status: string;
}

export const PlanReservationSchema = SchemaFactory.createForClass(PlanReservation);
