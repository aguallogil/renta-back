import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/cliente.model';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  async create(@Body() createClienteDto: Partial<Cliente>): Promise<Cliente> {
    return this.clienteService.create(createClienteDto);
  }

  @Get()
  async findAll(): Promise<Cliente[]> {
    return this.clienteService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Cliente> {
    return this.clienteService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateClienteDto: Partial<Cliente>): Promise<Cliente> {
    return this.clienteService.update(id, updateClienteDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.clienteService.delete(id);
  }
}
