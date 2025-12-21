import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { QueryDto } from '../common/dto/query.dto';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}

    create(createCategoryDto: CreateCategoryDto) {
        const category = this.categoryRepository.create(createCategoryDto);
        return this.categoryRepository.save(category);
    }

    findAll(queryDto: QueryDto): Promise<Pagination<Category>> {
        const { page, limit } = queryDto;
        return paginate<Category>(this.categoryRepository, { page, limit });
    }

    findOne(id: number) {
        return this.categoryRepository.findOne({ where: { id } });
    }

    update(id: number, updateCategoryDto: UpdateCategoryDto) {
        return this.categoryRepository.update(id, updateCategoryDto);
    }

    remove(id: number) {
        return this.categoryRepository.delete(id);
    }
}