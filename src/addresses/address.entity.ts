import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('addresses')
export class Address {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.addresses, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ length: 150 })
    calle: string;

    @Column({ length: 100 })
    ciudad: string;

    @Column({ length: 20 })
    codigo_postal: string;

    @Column({ length: 100, nullable: true })
    referencia: string;
}
