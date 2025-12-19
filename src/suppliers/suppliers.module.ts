import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';
import { Supplier } from './supplier.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Supplier])],
    controllers: [SuppliersController],
    providers: [SuppliersService],
    exports: [SuppliersService], // Exported to be used by ProductsModule if needed
})
export class SuppliersModule { }
