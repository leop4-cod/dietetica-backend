import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Category } from '../categories/category.entity';
import { Inventory } from '../inventory/inventory.entity';
import { Supplier } from '../suppliers/supplier.entity';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 150 })
    nombre: string;

    @Column('text')
    descripcion: string;

    @Column('decimal', { precision: 10, scale: 2 })
    precio: number;

    @ManyToOne(() => Category)
    @JoinColumn({ name: 'categoria_id' })
    category: Category;

    @ManyToOne(() => Supplier)
    @JoinColumn({ name: 'supplier_id' })
    supplier: Supplier;

    @OneToOne(() => Inventory, (inventory) => inventory.product)
    inventory: Inventory;

    @Column({ default: true })
    activo: boolean;
}
