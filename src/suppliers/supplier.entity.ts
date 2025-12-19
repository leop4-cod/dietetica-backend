import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Product } from '../products/product.entity';

@Entity('suppliers')
export class Supplier {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100 })
    nombre: string;

    @Column({ length: 100, nullable: true })
    contacto: string; // Nombre de la persona de contacto

    @Column({ length: 100, nullable: true })
    email: string;

    @Column({ length: 20, nullable: true })
    telefono: string;

    @OneToMany(() => Product, (product) => product.supplier)
    products: Product[];

    @CreateDateColumn()
    fecha_registro: Date;
}
