import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryDto } from '../common/dto/query.dto';
import * as bcrypt from 'bcrypt';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { email, password, rol, codigo_secreto, ...userData } = createUserDto;

        // Security check for roles
        if (rol && ['admin', 'empleado'].includes(rol)) {
            const ADMIN_SECRET = process.env.ADMIN_SECRET || 'DIETETICA_SECRET_2025';
            if (codigo_secreto !== ADMIN_SECRET) {
                throw new UnauthorizedException('Código secreto inválido para crear usuarios administrativos');
            }
        }

        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new ConflictException('El correo electrónico ya está registrado');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = this.userRepository.create({
            ...userData,
            email,
            password: hashedPassword,
            rol: rol || 'cliente',
        });

        return this.userRepository.save(newUser);
    }

    async findAll(queryDto: QueryDto): Promise<Pagination<User>> {
        const { page = 1, limit = 10, search } = queryDto;
        const queryBuilder = this.userRepository.createQueryBuilder('user');

        if (search) {
            queryBuilder.where('user.nombre ILIKE :search OR user.email ILIKE :search', { search: `%${search}%` });
        }

        return paginate<User>(queryBuilder, { page, limit });
    }

    async findOne(id: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { id } });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email } });
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }
        await this.userRepository.update(id, updateUserDto);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}
