import { BadRequestException, Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { SuccessResponseDto } from '../common/dto/response.dto';
import { CreatePlanReservationDto } from './dto/create-plan-reservation.dto';
import { PlanReservationsService } from './plan-reservations.service';

@Controller('plan-reservations')
export class PlanReservationsController {
    constructor(private readonly planReservationsService: PlanReservationsService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Request() req, @Body() dto: CreatePlanReservationDto) {
        const userId = dto.userId ?? req?.user?.sub ?? req?.user?.id ?? req?.user?.userId;
        if (!userId) {
            throw new BadRequestException('userId is required');
        }
        const reservation = await this.planReservationsService.create(String(userId), dto);
        return new SuccessResponseDto('Plan reservation created', reservation);
    }

    @Roles('admin', 'empleado')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async findAll() {
        const reservations = await this.planReservationsService.findAll();
        return new SuccessResponseDto('Plan reservations retrieved', reservations);
    }
}
