import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { Sale } from './sale.entity';
import { SaleDetail } from '../sale-details/sale-detail.entity';
import { InventoryModule } from '../inventory/inventory.module';
import { CouponsModule } from '../coupons/coupons.module';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sale, SaleDetail]),
    InventoryModule,
    CouponsModule,
    CartModule
  ],
  controllers: [SalesController],
  providers: [SalesService],
  exports: [SalesService],
})
export class SalesModule { }
