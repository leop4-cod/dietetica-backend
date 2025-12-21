import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { NutritionPlansService } from './nutrition-plans.service';
import { CreateNutritionPlanDto } from './dto/create-nutrition-plan.dto';
import { UpdateNutritionPlanDto } from './dto/update-nutrition-plan.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { SuccessResponseDto } from '../common/dto/response.dto';

@Controller('nutrition-plans')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NutritionPlansController {
    constructor(private readonly nutritionPlansService: NutritionPlansService) { }

    @Roles('admin', 'empleado')
    @Post()
    async create(@Body() createNutritionPlanDto: CreateNutritionPlanDto) {
        const plan = await this.nutritionPlansService.create(createNutritionPlanDto);
        return new SuccessResponseDto('Nutrition Plan created successfully', plan);
    }

    @Get()
    async findAll() {
        const plans = await this.nutritionPlansService.findAll();
        return new SuccessResponseDto('Nutrition Plans retrieved successfully', plans);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const plan = await this.nutritionPlansService.findOne(id);
        return new SuccessResponseDto('Nutrition Plan retrieved successfully', plan);
    }

    @Roles('admin', 'empleado')
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateNutritionPlanDto: UpdateNutritionPlanDto) {
        const plan = await this.nutritionPlansService.update(id, updateNutritionPlanDto);
        return new SuccessResponseDto('Nutrition Plan updated successfully', plan);
    }

    @Roles('admin')
    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.nutritionPlansService.remove(id);
        return new SuccessResponseDto('Nutrition Plan deleted successfully', null);
    }
}