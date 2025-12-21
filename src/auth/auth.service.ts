import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
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

        // Automatic Logging
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
}
