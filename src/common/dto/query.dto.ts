import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryDto {
    @Transform(({ value }) => (value === undefined ? undefined : Number(value)))
    @IsOptional()
    @IsInt()
    @Min(1)
    page: number = 1;

    @Transform(({ value }) => (value === undefined ? undefined : Number(value)))
    @IsOptional()
    @IsInt()
    @Min(1)
    limit: number = 10;

    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsString()
    searchField?: string;

    @IsOptional()
    @IsString()
    sort?: string;

    @IsOptional()
    @IsString()
    order?: 'ASC' | 'DESC';
}
