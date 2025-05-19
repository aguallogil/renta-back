import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { RentaService } from '../services/renta.service';
import { Renta } from '../models/renta.model';

@Controller('rentas')
export class RentaController {
  constructor(private readonly rentaService: RentaService) {}

  // Crear una nueva renta
  @Post()
  async create(@Body() createRentaDto: Partial<Renta>): Promise<Renta> {
    return this.rentaService.create(createRentaDto);
  }

  // Obtener todas las rentas
  @Get()
  async findAll(): Promise<Renta[]> {
    return this.rentaService.findAll();
  }

  // Obtener una renta por ID
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Renta> {
    return this.rentaService.findById(id);
  }

  // Actualizar una renta por ID
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRentaDto: Partial<Renta>,
  ): Promise<Renta> {
    return this.rentaService.update(id, updateRentaDto);
  }

  // Eliminar una renta por ID
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.rentaService.delete(id);
  }
}
