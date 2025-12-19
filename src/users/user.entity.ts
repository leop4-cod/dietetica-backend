import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Address } from '../addresses/address.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100 })
    nombre: string;

    @Column({ length: 120, unique: true })
    email: string;

    @Column({ type: 'text' })
    password: string;

    @Column({ length: 20, nullable: true })
    telefono: string;

    @Column({ default: 'cliente' })
    rol: string;

    @OneToMany(() => Address, (address) => address.user, { cascade: true })
    addresses: Address[];

    @CreateDateColumn({ name: 'fecha_registro' })
    fecha_registro: Date;
}
