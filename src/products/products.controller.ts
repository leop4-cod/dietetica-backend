import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { SuccessResponseDto } from '../common/dto/response.dto';
import { QueryDto } from '../common/dto/query.dto';
import { Public } from '../auth/public.decorator';

@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Roles('admin', 'empleado')
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productsService.create(createProductDto);
    return new SuccessResponseDto(
      'Product created successfully',
      product,
    );
  }

  @Public()
  @Get()
  async findAll(@Query() queryDto: QueryDto) {
    const products = await this.productsService.findAll(queryDto);
    return new SuccessResponseDto(
      'Products retrieved successfully',
      products,
    );
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productsService.findOne(id);
    return new SuccessResponseDto(
      'Product retrieved successfully',
      product,
    );
  }

  @Roles('admin', 'empleado')
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    await this.productsService.update(id, updateProductDto);
    return new SuccessResponseDto(
      'Product updated successfully',
      null,
    );
  }

  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.productsService.remove(id);
    return new SuccessResponseDto(
      'Product deleted successfully',
      null,
    );
  }
}