import { IsInt, IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

export class CreateSaleDetailDto {
    @IsUUID()
    @IsNotEmpty()
    sale_id: string;

    @IsUUID()
    @IsNotEmpty()
    product_id: string;

    @IsInt()
    @Min(1)
    cantidad: number;

    @IsNumber()
    @Min(0)
    precio_unitario: number;
}
