import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NutritionPlanDocument = HydratedDocument<NutritionPlan>;

@Schema({ collection: 'nutrition_plans' })
export class NutritionPlan {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    objetivo: string; 

    @Prop({ required: true })
    calorias_diarias: number;

    @Prop()
    imageUrl?: string;

    @Prop({ type: [String], default: [] })
    recomendaciones: string[];
}

export const NutritionPlanSchema = SchemaFactory.createForClass(NutritionPlan);
