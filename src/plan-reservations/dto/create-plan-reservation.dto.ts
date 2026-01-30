import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePlanReservationDto {
    @IsString()
    @IsNotEmpty()
    planId: string;

    @IsString()
    @IsOptional()
    userId?: string;
}
