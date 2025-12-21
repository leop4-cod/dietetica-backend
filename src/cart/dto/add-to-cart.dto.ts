import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

export class AddToCartDto {
    @IsUUID()
    @IsNotEmpty()
    product_id: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    cantidad: number;
}