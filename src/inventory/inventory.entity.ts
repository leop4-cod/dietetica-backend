import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Product } from '../products/product.entity';

@Entity('inventory')
export class Inventory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => Product, (product) => product.inventory, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column({ type: 'int', default: 0 })
    stock: number;

    @Column({ length: 100, nullable: true })
    ubicacion: string;

    @UpdateDateColumn({ name: 'ultima_actualizacion' })
    updatedAt: Date;
}
