import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NutritionPlan, NutritionPlanDocument } from './schemas/nutrition-plan.schema';
import { CreateNutritionPlanDto } from './dto/create-nutrition-plan.dto';
import { UpdateNutritionPlanDto } from './dto/update-nutrition-plan.dto';

@Injectable()
export class NutritionPlansService {
    constructor(@InjectModel(NutritionPlan.name) private nutritionPlanModel: Model<NutritionPlanDocument>) { }

    async create(createNutritionPlanDto: CreateNutritionPlanDto): Promise<NutritionPlan> {
        const createdPlan = new this.nutritionPlanModel(createNutritionPlanDto);
        return createdPlan.save();
    }

    async findAll(): Promise<NutritionPlan[]> {
        return this.nutritionPlanModel.find().exec();
    }

    async findOne(id: string): Promise<NutritionPlan> {
        const plan = await this.nutritionPlanModel.findById(id).exec();
        if (!plan) throw new NotFoundException(`Nutrition Plan with ID ${id} not found`);
        return plan;
    }

    async update(id: string, updateNutritionPlanDto: UpdateNutritionPlanDto): Promise<NutritionPlan> {
        const updatedPlan = await this.nutritionPlanModel.findByIdAndUpdate(id, updateNutritionPlanDto, { new: true }).exec();
        if (!updatedPlan) throw new NotFoundException(`Nutrition Plan with ID ${id} not found`);
        return updatedPlan;
    }

    async remove(id: string): Promise<NutritionPlan> {
        const deletedPlan = await this.nutritionPlanModel.findByIdAndDelete(id).exec();
        if (!deletedPlan) throw new NotFoundException(`Nutrition Plan with ID ${id} not found`);
        return deletedPlan;
    }
}
