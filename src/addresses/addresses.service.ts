import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressesService {
    constructor(
        @InjectRepository(Address)
        private addressRepository: Repository<Address>,
    ) { }

    create(createAddressDto: CreateAddressDto) {
        // Map user_id to user relation object
        const { user_id, ...addressData } = createAddressDto;
        const address = this.addressRepository.create({
            ...addressData,
            user: { id: user_id }
        });
        return this.addressRepository.save(address);
    }

    findAll() {
        return this.addressRepository.find({ relations: ['user'] });
    }

    async findOne(id: string) {
        const address = await this.addressRepository.findOne({
            where: { id },
            relations: ['user']
        });
        if (!address) throw new NotFoundException('Dirección no encontrada');
        return address;
    }

    async update(id: string, updateAddressDto: UpdateAddressDto) {
        await this.addressRepository.update(id, updateAddressDto);
        return this.findOne(id);
    }

    remove(id: string) {
        return this.addressRepository.delete(id);
    }
}
