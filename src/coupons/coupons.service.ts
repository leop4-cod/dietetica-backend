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

    create(createCouponDto: CreateCouponDto) {
        const coupon = this.couponRepository.create(createCouponDto);
        return this.couponRepository.save(coupon);
    }

    findAll() {
        return this.couponRepository.find();
    }

    async findByCode(codigo: string) {
        const coupon = await this.couponRepository.findOneBy({ codigo });
        if (!coupon) throw new NotFoundException('Cupón no válido');

        if (!coupon.activo) throw new BadRequestException('El cupón no está activo');

        const now = new Date();
        const expiration = new Date(coupon.fecha_expiracion);
        if (now > expiration) throw new BadRequestException('El cupón ha expirado');

        return coupon;
    }

    async findOne(id: string) {
        const coupon = await this.couponRepository.findOneBy({ id });
        if (!coupon) throw new NotFoundException('Cupón no encontrado');
        return coupon;
    }

    async update(id: string, updateCouponDto: UpdateCouponDto) {
        await this.couponRepository.update(id, updateCouponDto);
        return this.findOne(id);
    }

    remove(id: string) {
        return this.couponRepository.delete(id);
    }
}
