import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsDateString()
  cita_fecha: string;

  @IsString()
  @IsNotEmpty()
  motivo: string;

  @IsString()
  @IsOptional()
  estado?: string;

  @IsString()
  @IsOptional()
  especialista?: string;
}
