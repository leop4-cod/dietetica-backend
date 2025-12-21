import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('suppliers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SuppliersController {
    constructor(private readonly suppliersService: SuppliersService) { }

    @Post()
    @Roles('admin', 'empleado')
    create(@Body() createSupplierDto: CreateSupplierDto) {
        return this.suppliersService.create(createSupplierDto);
    }

    @Get()
    findAll() {
        return this.suppliersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.suppliersService.findOne(id);
    }

    @Put(':id')
    @Roles('admin', 'empleado')
    update(@Param('id') id: string, @Body() updateSupplierDto: UpdateSupplierDto) {
        return this.suppliersService.update(id, updateSupplierDto);
    }

    @Delete(':id')
    @Roles('admin')
    remove(@Param('id') id: string) {
        return this.suppliersService.remove(id);
    }
}
