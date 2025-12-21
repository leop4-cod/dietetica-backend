import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Sale } from './sale.entity';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { QueryDto } from '../common/dto/query.dto';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { SaleDetail } from '../sale-details/sale-detail.entity';
import { InventoryService } from '../inventory/inventory.service';
import { CouponsService } from '../coupons/coupons.service';
import { CartService } from '../cart/cart.service';
import { Coupon } from '../coupons/coupon.entity';

@Injectable()
export class SalesService {
    constructor(
        @InjectRepository(Sale)
        private saleRepository: Repository<Sale>,
        @InjectRepository(SaleDetail)
        private saleDetailRepository: Repository<SaleDetail>,
        private inventoryService: InventoryService,
        private couponsService: CouponsService,
        private cartService: CartService,
        private dataSource: DataSource,
    ) { }

    async create(createSaleDto: CreateSaleDto) {
        const { user_id, coupon_code, metodo_pago, estado } = createSaleDto;

        // 1. Get Cart Items
        const cart = await this.cartService.getCart(user_id);
        if (!cart || cart.items.length === 0) {
            throw new BadRequestException('El carrito está vacío');
        }

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // 2. Validate Coupon
            let coupon: Coupon | null = null;
            if (coupon_code) {
                coupon = await this.couponsService.findByCode(coupon_code);
            }

            let totalSale = 0;
            const saleDetailsToSave: SaleDetail[] = [];

            // 3. Process Items from Cart
            for (const item of cart.items) {
                // Strict Stock Check
                const inventory = await this.inventoryService.findByProduct(item.product_id);

                if (!inventory) {
                    throw new BadRequestException(`Producto ${item.product_id} no encontrado en inventario`);
                }
                const product = inventory.product;

                if (inventory.stock < item.cantidad) {
                    throw new BadRequestException(`Stock insuficiente para el producto ${product.nombre}. Stock actual: ${inventory.stock}`);
                }

                // Deduct Stock
                const newStock = inventory.stock - item.cantidad;
                await queryRunner.manager.update('inventory', { id: inventory.id }, { stock: newStock });

                // Calculate Values
                const precio_unitario = Number(product.precio);
                const subtotal = precio_unitario * item.cantidad;
                totalSale += subtotal;

                // Prepare Detail
                const detail = this.saleDetailRepository.create({
                    product: { id: item.product_id },
                    cantidad: item.cantidad,
                    precio_unitario: precio_unitario,
                    subtotal: subtotal
                });
                saleDetailsToSave.push(detail);
            }

            // 4. Apply Discount
            if (coupon && coupon.activo) {
                const discountAmount = (totalSale * Number(coupon.descuento_porcentaje)) / 100;
                totalSale = totalSale - discountAmount;
                if (totalSale < 0) totalSale = 0;
            }

            // 5. Create Sale Header
            const sale = this.saleRepository.create({
                user: { id: user_id },
                total: totalSale,
                metodo_pago: metodo_pago,
                estado: estado || 'completado',
                coupon: coupon ? { id: coupon.id } : undefined,
                fecha: new Date()
            });
            const savedSale = await queryRunner.manager.save(sale) as Sale;

            // 6. Save Details
            for (const detail of saleDetailsToSave) {
                detail.sale = savedSale;
                await queryRunner.manager.save(detail);
            }

            await queryRunner.commitTransaction();

            // 7. Clear Cart
            await this.cartService.clearCart(user_id);

            return this.findOne(savedSale.id);

        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    findAll(queryDto: QueryDto): Promise<Pagination<Sale>> {
        const { page = 1, limit = 10 } = queryDto;
        const queryBuilder = this.saleRepository.createQueryBuilder('sale')
            .leftJoinAndSelect('sale.user', 'user')
            .leftJoinAndSelect('sale.coupon', 'coupon')
            .leftJoinAndSelect('sale.detalles', 'detalles')
            .leftJoinAndSelect('detalles.product', 'product')
            .orderBy('sale.fecha', 'DESC');

        return paginate<Sale>(queryBuilder, { page, limit });
    }

    findOne(id: string) {
        return this.saleRepository.findOne({
            where: { id },
            relations: ['user', 'coupon', 'detalles', 'detalles.product']
        });
    }

    async update(id: string, updateSaleDto: UpdateSaleDto) {
        await this.saleRepository.update(id, updateSaleDto);
        return this.findOne(id);
    }

    async remove(id: string) {
        return this.saleRepository.delete(id);
    }
}
