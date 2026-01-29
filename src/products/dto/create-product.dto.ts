import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    descripcion: string;

    @IsNumber()
    @Min(0)
    precio: number;

    @IsString()
    @IsOptional()
    image_url?: string;

    @IsInt()
    @Min(0)
    stock: number;

    @IsInt()
    categoria_id: number;

    @IsUUID()
    @IsOptional()
    supplier_id?: string;

    @IsBoolean()
    @IsOptional()
    activo?: boolean;
}
