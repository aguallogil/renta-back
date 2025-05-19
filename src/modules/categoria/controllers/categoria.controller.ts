import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../models/categoria.model';

@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  // Crear una nueva categoría
  @Post()
  async create(@Body() createCategoriaDto: Partial<Categoria>): Promise<Categoria> {
    return this.categoriaService.create(createCategoriaDto);
  }

  // Obtener todas las categorías
  @Get()
  async findAll(): Promise<Categoria[]> {
    return this.categoriaService.findAll();
  }

  // Actualizar una categoría existente por ID
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCategoriaDto: Partial<Categoria>): Promise<Categoria> {
    return this.categoriaService.update(id, updateCategoriaDto);
  }

  // Eliminar una categoría por ID
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.categoriaService.delete(id);
  }
}
