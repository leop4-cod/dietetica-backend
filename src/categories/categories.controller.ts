import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { SuccessResponseDto } from '../common/dto/response.dto';
import { QueryDto } from '../common/dto/query.dto';

@Controller('categories')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Roles('admin', 'empleado')
    @Post()
    async create(@Body() createCategoryDto: CreateCategoryDto) {
        const category = await this.categoriesService.create(createCategoryDto);
        return new SuccessResponseDto('Category created successfully', category);
    }

    @Get()
    async findAll(@Query() queryDto: QueryDto) {
        const categories = await this.categoriesService.findAll(queryDto);
        return new SuccessResponseDto('Categories retrieved successfully', categories);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const category = await this.categoriesService.findOne(+id);
        return new SuccessResponseDto('Category retrieved successfully', category);
    }

    @Roles('admin', 'empleado')
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
        await this.categoriesService.update(+id, updateCategoryDto);
        return new SuccessResponseDto('Category updated successfully', null);
    }

    @Roles('admin')
    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.categoriesService.remove(+id);
        return new SuccessResponseDto('Category deleted successfully', null);
    }
}
