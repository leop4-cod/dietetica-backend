import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateCouponDto {
    @IsString()
    @IsNotEmpty()
    codigo: string;

    @IsNumber()
    @Min(0)
    @Max(100)
    descuento_porcentaje: number;

    @IsDateString()
    fecha_expiracion: string;

    @IsBoolean()
    @IsOptional()
    activo?: boolean;
}
