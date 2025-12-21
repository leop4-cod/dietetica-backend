import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHistoryDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    productId: string;
}
