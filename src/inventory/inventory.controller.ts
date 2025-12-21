import { Controller, Get, Param, Body, Put, Post, UseGuards } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('inventory')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) { }

    @Get(':productId')
    async getInventory(@Param('productId') productId: string) {
        return this.inventoryService.findByProduct(productId);
    }

    @Roles('admin', 'empleado')
    @Put(':productId')
    async updateStock(@Param('productId') productId: string, @Body('stock') stock: number) {
        return this.inventoryService.updateStock(productId, stock);
    }
}
