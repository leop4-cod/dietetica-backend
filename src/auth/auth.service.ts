import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import * as bcrypt from 'bcrypt';
import { AuthLogsService } from '../auth-logs/auth-logs.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private authLogsService: AuthLogsService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (!user) return null;

        const isMatch = await bcrypt.compare(pass, user.password);
        if (isMatch) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(loginDto: LoginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const payload = {
            email: user.email,
            sub: user.id,
            role: user.rol,
        };

        await this.authLogsService.create({
            userId: user.id,
            accion: 'LOGIN_SUCCESS'
        });

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                nombre: user.nombre,
                email: user.email,
                role: user.rol,
            },
        };
    }

    async register(registerDto: RegisterDto) {
        // UsersService ya hace el hash
        const user = await this.usersService.create(registerDto);

        return {
            message: 'Usuario registrado exitosamente',
            user: {
                id: user.id,
                nombre: user.nombre,
                email: user.email,
                role: user.rol,
            },
        };
    }

    async createAdmin(dto: CreateAdminDto) {
        const exists = await this.usersService.findByEmail(dto.email);
        if (exists) throw new BadRequestException('Ya existe un usuario con ese email');


        const user = await this.usersService.create({
            nombre: dto.name,
            email: dto.email,
            password: dto.password, // UsersService hace el hash
            rol: 'admin',
            codigo_secreto: process.env.ADMIN_SECRET || 'DIETETICA_SECRET_2025',
        } as any);

        return {
            message: 'Admin creado exitosamente',
            user: {
                id: user.id,
                nombre: user.nombre,
                email: user.email,
                role: user.rol,
            },
        };
    }
}
