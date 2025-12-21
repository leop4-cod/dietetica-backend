import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaleDetail } from './sale-detail.entity';
import { CreateSaleDetailDto } from './dto/create-sale-detail.dto';
import { UpdateSaleDetailDto } from './dto/update-sale-detail.dto';
import { QueryDto } from '../common/dto/query.dto';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class SaleDetailsService {
    constructor(
        @InjectRepository(SaleDetail)
        private readonly saleDetailRepository: Repository<SaleDetail>,
    ) { }

    create(createSaleDetailDto: CreateSaleDetailDto) {
        const { sale_id, product_id, ...data } = createSaleDetailDto;
        return this.saleDetailRepository.save({
            ...data,
            sale: { id: sale_id },
            product: { id: product_id }
        });
    }

    findAll(queryDto: QueryDto): Promise<Pagination<SaleDetail>> {
        const { page, limit } = queryDto;
        return paginate<SaleDetail>(this.saleDetailRepository, { page, limit });
    }

    findOne(id: string) {
        return this.saleDetailRepository.findOne({ where: { id }, relations: ['sale', 'product'] });
    }

    update(id: string, updateSaleDetailDto: UpdateSaleDetailDto) {
        return this.saleDetailRepository.update(id, updateSaleDetailDto);
    }

    remove(id: string) {
        return this.saleDetailRepository.delete(id);
    }
}
