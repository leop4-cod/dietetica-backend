import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { HistoryService } from './history.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) { }

  @Post()
  create(@Body() createHistoryDto: CreateHistoryDto) {
    return this.historyService.create(createHistoryDto);
  }

  @Post('appointments')
  createAppointment(@Body() dto: CreateAppointmentDto) {
    return this.historyService.createAppointment(dto);
  }

  @Get()
  findAll() {
    return this.historyService.findAll();
  }

  @Get('appointments')
  findAppointments(@Query('userId') userId?: string) {
    return this.historyService.findAppointments(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historyService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateHistoryDto: UpdateHistoryDto) {
    return this.historyService.update(id, updateHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historyService.remove(id);
  }
}
