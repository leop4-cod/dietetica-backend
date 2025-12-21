import { IsEmail, IsNotEmpty, IsString, MinLength, IsIn, IsOptional } from 'class-validator';

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    telefono: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsString()
    @IsOptional()
    @IsIn(['admin', 'empleado', 'cliente'])
    rol?: string;

    @IsString()
    @IsOptional()
    codigo_secreto?: string;
}