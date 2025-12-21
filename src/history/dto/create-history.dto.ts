import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateHistoryDto {
    @IsUUID()
    @IsNotEmpty()
    userId: string;

    @IsUUID()
    @IsNotEmpty()
    productId: string;
}