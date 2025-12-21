import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('coupons')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CouponsController {
    constructor(private readonly couponsService: CouponsService) { }

    @Post()
    @Roles('admin')
    create(@Body() createCouponDto: CreateCouponDto) {
        return this.couponsService.create(createCouponDto);
    }

    @Get()
    @Roles('admin', 'empleado')
    findAll() {
        return this.couponsService.findAll();
    }

    @Get('validate/:code')
    validate(@Param('code') code: string) {
        return this.couponsService.findByCode(code);
    }

    @Get(':id')
    @Roles('admin', 'empleado')
    findOne(@Param('id') id: string) {
        return this.couponsService.findOne(id);
    }

    @Put(':id')
    @Roles('admin')
    update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto) {
        return this.couponsService.update(id, updateCouponDto);
    }

    @Delete(':id')
    @Roles('admin')
    remove(@Param('id') id: string) {
        return this.couponsService.remove(id);
    }
}
