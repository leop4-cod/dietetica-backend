import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from './inventory.entity';

@Injectable()
export class InventoryService {
    constructor(
        @InjectRepository(Inventory)
        private inventoryRepository: Repository<Inventory>,
    ) { }

    async create(productId: string, stock: number, location?: string): Promise<Inventory> {
        const inventory = this.inventoryRepository.create({
            product: { id: productId },
            stock,
            ubicacion: location,
        });
        return this.inventoryRepository.save(inventory);
    }

    async findByProduct(productId: string): Promise<Inventory | null> {
        return this.inventoryRepository.findOne({
            where: { product: { id: productId } },
            relations: ['product']
        });
    }

    async updateStock(productId: string, stock: number): Promise<Inventory> {
        const inventory = await this.findByProduct(productId);
        if (!inventory) {
            // Create if not exists (fallback)
            return this.create(productId, stock);
        }
        inventory.stock = stock;
        return this.inventoryRepository.save(inventory);
    }
}
