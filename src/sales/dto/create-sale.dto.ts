import { IsNotEmpty, IsString, IsUUID, IsOptional } from 'class-validator';



export class CreateSaleDto {
    @IsUUID()
    @IsNotEmpty()
    user_id: string;

    @IsString()
    @IsNotEmpty()
    metodo_pago: string; // Made required as per request

    @IsString()
    @IsOptional()
    estado?: string;

    @IsString()
    @IsOptional()
    coupon_code?: string;

}
