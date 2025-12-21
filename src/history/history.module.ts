import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { HistoryLog, HistoryLogSchema } from './schemas/history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: HistoryLog.name, schema: HistoryLogSchema }]),
  ],
  controllers: [HistoryController],
  providers: [HistoryService],
  exports: [HistoryService],
})
export class HistoryModule { }