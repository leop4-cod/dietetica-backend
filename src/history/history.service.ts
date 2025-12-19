import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HistoryLog, HistoryLogDocument } from './schemas/history.schema';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';

@Injectable()
export class HistoryService {
  constructor(@InjectModel(HistoryLog.name) private historyModel: Model<HistoryLogDocument>) { }

  async create(createHistoryDto: CreateHistoryDto): Promise<HistoryLog> {
    const createdLog = new this.historyModel(createHistoryDto);
    return createdLog.save();
  }

  async findAll(): Promise<HistoryLog[]> {
    return this.historyModel.find().exec();
  }

  async findOne(id: string): Promise<HistoryLog> {
    const log = await this.historyModel.findById(id).exec();
    if (!log) throw new NotFoundException(`History log with ID ${id} not found`);
    return log;
  }

  async update(id: string, updateHistoryDto: UpdateHistoryDto): Promise<HistoryLog> {
    const updatedLog = await this.historyModel.findByIdAndUpdate(id, updateHistoryDto, { new: true }).exec();
    if (!updatedLog) throw new NotFoundException(`History log with ID ${id} not found`);
    return updatedLog;
  }

  async remove(id: string): Promise<HistoryLog> {
    const deletedLog = await this.historyModel.findByIdAndDelete(id).exec();
    if (!deletedLog) throw new NotFoundException(`History log with ID ${id} not found`);
    return deletedLog;
  }
}
