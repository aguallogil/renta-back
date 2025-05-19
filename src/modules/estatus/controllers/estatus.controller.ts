import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { EstatusService } from '../services/estatus.service';
import { Estatus } from '../models/estatus.model';

@Controller('estatus')
export class EstatusController {
  constructor(private readonly estatusService: EstatusService) {}

  @Post()
  async create(@Body() createEstatusDto: Partial<Estatus>): Promise<Estatus> {
    return this.estatusService.create(createEstatusDto);
  }

  @Get()
  async findAll(): Promise<Estatus[]> {
    return this.estatusService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Estatus> {
    return this.estatusService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateEstatusDto: Partial<Estatus>): Promise<Estatus> {
    return this.estatusService.update(id, updateEstatusDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.estatusService.delete(id);
  }
}
