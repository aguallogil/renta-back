import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { ArticuloService } from '../services/articulo.service';
import { Articulo } from '../models/articulo.model';

@Controller('articulos')
export class ArticuloController {
  constructor(private readonly articuloService: ArticuloService) {}

  @Post()
  async create(@Body() createArticuloDto: Partial<Articulo>): Promise<Articulo> {
    return this.articuloService.create(createArticuloDto);
  }

  @Get()
  async findAll(): Promise<Articulo[]> {
    return this.articuloService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Articulo> {
    return this.articuloService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateArticuloDto: Partial<Articulo>): Promise<Articulo> {
    return this.articuloService.update(id, updateArticuloDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.articuloService.delete(id);
  }
}
