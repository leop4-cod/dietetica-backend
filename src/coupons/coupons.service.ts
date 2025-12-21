import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coupon } from './coupon.entity';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Injectable()
export class CouponsService {
    constructor(
        @InjectRepository(Coupon)
        private couponRepository: Repository<Coupon>,
    ) { }

    async create(createCouponDto: CreateCouponDto): Promise<Coupon> {
        // Verificar que el código no exista
        const existing = await this.couponRepository.findOneBy({ 
            codigo: createCouponDto.codigo 
        });
        
        if (existing) {
            throw new BadRequestException('El código del cupón ya existe');
        }

        const coupon = this.couponRepository.create(createCouponDto);
        return this.couponRepository.save(coupon);
    }

    findAll(): Promise<Coupon[]> {
        return this.couponRepository.find();
    }

    async findByCode(codigo: string): Promise<Coupon> {
        const coupon = await this.couponRepository.findOneBy({ codigo });
        if (!coupon) {
            throw new NotFoundException('Cupón no válido');
        }

        if (!coupon.activo) {
            throw new BadRequestException('El cupón no está activo');
        }

        const now = new Date();
        const expiration = new Date(coupon.fecha_expiracion);
        if (now > expiration) {
            throw new BadRequestException('El cupón ha expirado');
        }

        return coupon;
    }

    async findOne(id: string): Promise<Coupon> {
        const coupon = await this.couponRepository.findOneBy({ id });
        if (!coupon) {
            throw new NotFoundException('Cupón no encontrado');
        }
        return coupon;
    }

    async update(id: string, updateCouponDto: UpdateCouponDto): Promise<Coupon> {
        // Verificar que el cupón existe
        await this.findOne(id);
        
        // Si se actualiza el código, verificar que no esté duplicado
        if (updateCouponDto.codigo) {
            const existing = await this.couponRepository.findOneBy({ 
                codigo: updateCouponDto.codigo 
            });
            
            if (existing && existing.id !== id) {
                throw new BadRequestException('El código del cupón ya existe');
            }
        }

        await this.couponRepository.update(id, updateCouponDto);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        // Verificar que el cupón existe
        await this.findOne(id);
        
        const result = await this.couponRepository.delete(id);
        
        if (result.affected === 0) {
            throw new NotFoundException('No se pudo eliminar el cupón');
        }
    }
}