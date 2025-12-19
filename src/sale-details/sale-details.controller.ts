import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { SaleDetailsService } from './sale-details.service';
import { CreateSaleDetailDto } from './dto/create-sale-detail.dto';
import { UpdateSaleDetailDto } from './dto/update-sale-detail.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { SuccessResponseDto } from '../common/dto/response.dto';
import { QueryDto } from '../common/dto/query.dto';

@Controller('sale-details')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SaleDetailsController {
    constructor(private readonly saleDetailsService: SaleDetailsService) { }

    @Roles('admin', 'empleado')
    @Post()
    async create(@Body() createSaleDetailDto: CreateSaleDetailDto) {
        const saleDetail = await this.saleDetailsService.create(createSaleDetailDto);
        return new SuccessResponseDto('Sale Detail created successfully', saleDetail);
    }

    @Get()
    async findAll(@Query() queryDto: QueryDto) {
        const saleDetails = await this.saleDetailsService.findAll(queryDto);
        return new SuccessResponseDto('Sale Details retrieved successfully', saleDetails);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const saleDetail = await this.saleDetailsService.findOne(id);
        return new SuccessResponseDto('Sale Detail retrieved successfully', saleDetail);
    }

    @Roles('admin', 'empleado')
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateSaleDetailDto: UpdateSaleDetailDto) {
        await this.saleDetailsService.update(id, updateSaleDetailDto);
        return new SuccessResponseDto('Sale Detail updated successfully', null);
    }

    @Roles('admin')
    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.saleDetailsService.remove(id);
        return new SuccessResponseDto('Sale Detail deleted successfully', null);
    }
}
