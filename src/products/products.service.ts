import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryDto } from '../common/dto/query.dto';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { InventoryService } from '../inventory/inventory.service';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        private readonly inventoryService: InventoryService,
    ) { }

    async create(createProductDto: CreateProductDto) {
        // Explicitly cast to any to access stock if DTO type check is strict but runtime allows it
        const { categoria_id, supplier_id, stock, ...productData } = createProductDto as any;

        const product = await this.productRepository.save({
            ...productData,
            category: { id: categoria_id },
            supplier: supplier_id ? { id: supplier_id } : null,
        });

        if (stock !== undefined) {
            await this.inventoryService.create(product.id, stock);
        }

        return product;
    }

    findAll(queryDto: QueryDto): Promise<Pagination<Product>> {
        const { page = 1, limit = 10, search } = queryDto;
        const queryBuilder = this.productRepository.createQueryBuilder('product')
            .leftJoinAndSelect('product.category', 'category')
            .leftJoinAndSelect('product.inventory', 'inventory')
            .leftJoinAndSelect('product.supplier', 'supplier');

        if (search) {
            queryBuilder.where('product.nombre ILIKE :search', { search: `%${search}%` });
        }

        return paginate<Product>(queryBuilder, { page, limit });
    }

    findOne(id: string) {
        return this.productRepository.findOne({
            where: { id },
            relations: ['category', 'inventory', 'supplier']
        });
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        const { categoria_id, supplier_id, stock, ...data } = updateProductDto as any;
        const updateData: any = { ...data };
        if (categoria_id) {
            updateData.category = { id: categoria_id };
        }
        if (supplier_id) {
            updateData.supplier = { id: supplier_id };
        }

        await this.productRepository.update(id, updateData);

        if (stock !== undefined) {
            await this.inventoryService.updateStock(id, stock);
        }

        return this.findOne(id);
    }

    async remove(id: string) {
        return this.productRepository.delete(id);
    }
}
