import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NutritionPlan, NutritionPlanSchema } from '../nutrition-plans/schemas/nutrition-plan.schema';
import { PlanReservation, PlanReservationSchema } from './schemas/plan-reservation.schema';
import { PlanReservationsController } from './plan-reservations.controller';
import { PlanReservationsService } from './plan-reservations.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: PlanReservation.name, schema: PlanReservationSchema },
            { name: NutritionPlan.name, schema: NutritionPlanSchema },
        ]),
    ],
    controllers: [PlanReservationsController],
    providers: [PlanReservationsService],
})
export class PlanReservationsModule { }
