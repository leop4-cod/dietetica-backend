import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAuthLogDto {
    @IsUUID()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    accion: string;

    @IsDateString()
    @IsOptional()
    fecha?: string;
}