import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NutritionPlansService } from './nutrition-plans.service';
import { NutritionPlansController } from './nutrition-plans.controller';
import { NutritionPlan, NutritionPlanSchema } from './schemas/nutrition-plan.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NutritionPlan.name, schema: NutritionPlanSchema },
    ]),
  ],
  controllers: [NutritionPlansController],
  providers: [NutritionPlansService],
})
export class NutritionPlansModule { }
