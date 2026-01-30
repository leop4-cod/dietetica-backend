import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlanReservation, PlanReservationDocument } from './schemas/plan-reservation.schema';
import { NutritionPlan, NutritionPlanDocument } from '../nutrition-plans/schemas/nutrition-plan.schema';
import { CreatePlanReservationDto } from './dto/create-plan-reservation.dto';

@Injectable()
export class PlanReservationsService {
    constructor(
        @InjectModel(PlanReservation.name) private reservationModel: Model<PlanReservationDocument>,
        @InjectModel(NutritionPlan.name) private nutritionPlanModel: Model<NutritionPlanDocument>,
    ) { }

    async create(userId: string, dto: CreatePlanReservationDto) {
        const plan = await this.nutritionPlanModel.findById(dto.planId).exec();
        if (!plan) throw new NotFoundException(`Nutrition Plan with ID ${dto.planId} not found`);

        const existing = await this.reservationModel
            .findOne({ userId, planId: dto.planId })
            .exec();
        if (existing) return existing;

        const created = new this.reservationModel({
            userId,
            planId: dto.planId,
            planObjetivo: plan.objetivo,
            planCalorias: plan.calorias_diarias,
        });
        return created.save();
    }

    async findAll() {
        return this.reservationModel.find().sort({ createdAt: -1 }).exec();
    }
}
