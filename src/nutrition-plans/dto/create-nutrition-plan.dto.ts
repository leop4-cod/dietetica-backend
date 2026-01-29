import { IsArray, IsInt, IsNotEmpty, IsString, IsUUID, Min, IsOptional } from 'class-validator';

export class CreateNutritionPlanDto {
    @IsUUID()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    objetivo: string;

    @IsInt()
    @Min(0)
    calorias_diarias: number;

    @IsOptional()
    @IsString()
    imageUrl?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    recomendaciones: string[];
}
