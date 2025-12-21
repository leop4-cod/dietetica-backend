import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { SuccessResponseDto } from '../common/dto/response.dto';
import { QueryDto } from '../common/dto/query.dto';

@Controller('sales')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SalesController {
    constructor(private readonly salesService: SalesService) { }

    @Roles('admin', 'empleado', 'cliente')
    @Post()
    async create(@Body() createSaleDto: CreateSaleDto) {
        const sale = await this.salesService.create(createSaleDto);
        return new SuccessResponseDto('Sale created successfully', sale);
    }

    @Get()
    async findAll(@Query() queryDto: QueryDto) {
        const sales = await this.salesService.findAll(queryDto);
        return new SuccessResponseDto('Sales retrieved successfully', sales);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const sale = await this.salesService.findOne(id);
        return new SuccessResponseDto('Sale retrieved successfully', sale);
    }

    @Roles('admin', 'empleado')
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
        await this.salesService.update(id, updateSaleDto);
        return new SuccessResponseDto('Sale updated successfully', null);
    }

    @Roles('admin')
    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.salesService.remove(id);
        return new SuccessResponseDto('Sale deleted successfully', null);
    }
}
