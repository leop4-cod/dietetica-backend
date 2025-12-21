import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Sale } from '../sales/sale.entity';

@Entity('coupons')
export class Coupon {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 20, unique: true })
    codigo: string;

    @Column('decimal', { precision: 5, scale: 2 })
    descuento_porcentaje: number;

    @Column({ type: 'date' })
    fecha_expiracion: Date;

    @Column({ default: true })
    activo: boolean;

    @OneToMany(() => Sale, (sale) => sale.coupon)
    sales: Sale[];
}