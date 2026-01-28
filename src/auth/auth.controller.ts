import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { SuccessResponseDto } from '../common/dto/response.dto';
import { CreateAdminDto } from './dto/create-admin.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        const result = await this.authService.login(loginDto);
        return new SuccessResponseDto('Login successful', result);
    }

    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        const result = await this.authService.register(registerDto);
        return new SuccessResponseDto('Registration successful', result);
    }

    @Post('create-admin')
    async createAdmin(@Body() dto: CreateAdminDto) {
        const result = await this.authService.createAdmin(dto);
        return new SuccessResponseDto('Admin creado', result);
    }
}
