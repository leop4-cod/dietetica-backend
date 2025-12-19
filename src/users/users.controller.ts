import { Controller, Get, Post, Body, Param, UseGuards, Query, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from '../auth/dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { QueryDto } from '../common/dto/query.dto';
import { SuccessResponseDto } from '../common/dto/response.dto';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Roles('admin')
    @Post()
    async create(@Body() registerDto: RegisterDto) {
        const user = await this.usersService.create(registerDto);
        return new SuccessResponseDto('User created successfully', user);
    }

    @Get()
    async findAll(@Query() queryDto: QueryDto) {
        const users = await this.usersService.findAll(queryDto);
        return new SuccessResponseDto('Users retrieved successfully', users);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const user = await this.usersService.findOne(id);
        return new SuccessResponseDto('User retrieved successfully', user);
    }

    @Roles('admin')
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        const user = await this.usersService.update(id, updateUserDto);
        return new SuccessResponseDto('User updated successfully', user);
    }

    @Roles('admin')
    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.usersService.remove(id);
        return new SuccessResponseDto('User deleted successfully', null);
    }
}
