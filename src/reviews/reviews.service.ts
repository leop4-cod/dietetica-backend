import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDocument } from './schemas/review.schema';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
        private readonly usersService: UsersService,
    ) { }

    async create(createReviewDto: CreateReviewDto): Promise<Review> {
        const user = await this.usersService.findOne(createReviewDto.userId);
        if (!user) {
            throw new NotFoundException(`User with ID ${createReviewDto.userId} not found`);
        }
        const createdReview = new this.reviewModel(createReviewDto);
        return createdReview.save();
    }

    async findAll(): Promise<Review[]> {
        return this.reviewModel.find().exec();
    }

    async findOne(id: string): Promise<Review> {
        const review = await this.reviewModel.findById(id).exec();
        if (!review) throw new NotFoundException(`Review with ID ${id} not found`);
        return review;
    }

    async update(id: string, updateReviewDto: UpdateReviewDto): Promise<Review> {
        const updatedReview = await this.reviewModel.findByIdAndUpdate(id, updateReviewDto, { new: true }).exec();
        if (!updatedReview) throw new NotFoundException(`Review with ID ${id} not found`);
        return updatedReview;
    }

    async remove(id: string): Promise<Review> {
        const deletedReview = await this.reviewModel.findByIdAndDelete(id).exec();
        if (!deletedReview) throw new NotFoundException(`Review with ID ${id} not found`);
        return deletedReview;
    }
}
