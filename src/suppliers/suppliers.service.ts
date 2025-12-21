import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from './supplier.entity';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Injectable()
export class SuppliersService {
    constructor(
        @InjectRepository(Supplier)
        private supplierRepository: Repository<Supplier>,
    ) { }

    create(createSupplierDto: CreateSupplierDto) {
        const supplier = this.supplierRepository.create(createSupplierDto);
        return this.supplierRepository.save(supplier);
    }

    findAll() {
        return this.supplierRepository.find();
    }

    async findOne(id: string) {
        const supplier = await this.supplierRepository.findOneBy({ id });
        if (!supplier) throw new NotFoundException('Proveedor no encontrado');
        return supplier;
    }

    async update(id: string, updateSupplierDto: UpdateSupplierDto) {
        await this.supplierRepository.update(id, updateSupplierDto);
        return this.findOne(id);
    }

    remove(id: string) {
        return this.supplierRepository.delete(id);
    }
}
