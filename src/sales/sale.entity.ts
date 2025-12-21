import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { SaleDetail } from '../sale-details/sale-detail.entity';
import { Coupon } from '../coupons/coupon.entity';

@Entity('sales')
export class Sale {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column('decimal', { precision: 10, scale: 2 })
    total: number;

    @Column({ length: 50, nullable: true })
    metodo_pago: string;

    @Column({ length: 30, default: 'Completada' })
    estado: string;

    @OneToMany(() => SaleDetail, (detail) => detail.sale, { cascade: true })
    detalles: SaleDetail[];

    @ManyToOne(() => Coupon, { nullable: true })
    @JoinColumn({ name: 'coupon_id' })
    coupon: Coupon;

    @CreateDateColumn({ name: 'fecha_venta' })
    fecha: Date;
}
