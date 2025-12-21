import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { SuccessResponseDto } from '../common/dto/response.dto';

@Controller('reviews')
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createReviewDto: CreateReviewDto) {
        const review = await this.reviewsService.create(createReviewDto);
        return new SuccessResponseDto('Review created successfully', review);
    }

    @Get()
    async findAll() {
        const reviews = await this.reviewsService.findAll();
        return new SuccessResponseDto('Reviews retrieved successfully', reviews);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const review = await this.reviewsService.findOne(id);
        return new SuccessResponseDto('Review retrieved successfully', review);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
        const review = await this.reviewsService.update(id, updateReviewDto);
        return new SuccessResponseDto('Review updated successfully', review);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.reviewsService.remove(id);
        return new SuccessResponseDto('Review deleted successfully', null);
    }
}
