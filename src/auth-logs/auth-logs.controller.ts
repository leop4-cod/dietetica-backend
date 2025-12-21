import { Controller, Get, Post, Body, UseGuards, Param, Put, Delete } from '@nestjs/common';
import { AuthLogsService } from './auth-logs.service';
import { CreateAuthLogDto } from './dto/create-auth-log.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { SuccessResponseDto } from '../common/dto/response.dto';

@Controller('auth-logs')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AuthLogsController {
    constructor(private readonly authLogsService: AuthLogsService) {}

    @Roles('admin')
    @Post()
    async create(@Body() createAuthLogDto: CreateAuthLogDto) {
        const log = await this.authLogsService.create(createAuthLogDto);
        return new SuccessResponseDto('Auth Log created successfully', log);
    }

    @Roles('admin')
    @Get()
    async findAll() {
        const logs = await this.authLogsService.findAll();
        return new SuccessResponseDto('Auth Logs retrieved successfully', logs);
    }

    @Roles('admin')
    @Get(':id')
    async findOne(@Param('id') id: string) {
        const log = await this.authLogsService.findOne(id);
        return new SuccessResponseDto('Auth Log retrieved successfully', log);
    }

    @Roles('admin')
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateAuthLogDto: any) {
        const log = await this.authLogsService.update(id, updateAuthLogDto);
        return new SuccessResponseDto('Auth Log updated successfully', log);
    }

    @Roles('admin')
    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.authLogsService.remove(id);
        return new SuccessResponseDto('Auth Log deleted successfully', null);
    }
}