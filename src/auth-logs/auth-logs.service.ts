import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthLog, AuthLogDocument } from './schemas/auth-log.schema';
import { CreateAuthLogDto } from './dto/create-auth-log.dto';

@Injectable()
export class AuthLogsService {
    constructor(@InjectModel(AuthLog.name) private authLogModel: Model<AuthLogDocument>) { }

    async create(createAuthLogDto: CreateAuthLogDto): Promise<AuthLog> {
        const createdLog = new this.authLogModel(createAuthLogDto);
        return createdLog.save();
    }

    async findAll(): Promise<AuthLog[]> {
        return this.authLogModel.find().exec();
    }

    async findOne(id: string): Promise<AuthLog> {
        const log = await this.authLogModel.findById(id).exec();
        if (!log) throw new NotFoundException(`AuthLog with ID ${id} not found`);
        return log;
    }

    async update(id: string, updateAuthLogDto: any): Promise<AuthLog> {
        const updatedLog = await this.authLogModel.findByIdAndUpdate(id, updateAuthLogDto, { new: true }).exec();
        if (!updatedLog) throw new NotFoundException(`AuthLog with ID ${id} not found`);
        return updatedLog;
    }

    async remove(id: string): Promise<AuthLog> {
        const deletedLog = await this.authLogModel.findByIdAndDelete(id).exec();
        if (!deletedLog) throw new NotFoundException(`AuthLog with ID ${id} not found`);
        return deletedLog;
    }
}
