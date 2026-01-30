import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class AddToCartDto {
    @IsString()
    @IsNotEmpty()
    product_id: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    cantidad: number;

    @IsString()
    @IsOptional()
    user_id?: string;
}
