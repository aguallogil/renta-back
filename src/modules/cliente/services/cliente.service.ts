import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cliente } from '../models/cliente.model';

@Injectable()
export class ClienteService {
  constructor(
    @InjectModel(Cliente.name) private readonly clienteModel: Model<Cliente>,
  ) {}

  // Crear un nuevo cliente
  async create(createClienteDto: Partial<Cliente>): Promise<Cliente> {
    const newCliente = new this.clienteModel(createClienteDto);
    return newCliente.save();
  }

  // Obtener todos los clientes
  async findAll(): Promise<Cliente[]> {
    return this.clienteModel.find().exec();
  }

  // Obtener un cliente por ID
  async findById(id: string): Promise<Cliente> {
    const cliente = await this.clienteModel.findById(id).exec();
    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }
    return cliente;
  }

  // Actualizar un cliente por ID
  async update(id: string, updateClienteDto: Partial<Cliente>): Promise<Cliente> {
    const updatedCliente = await this.clienteModel.findByIdAndUpdate(
      id,
      updateClienteDto,
      { new: true, runValidators: true },
    ).exec();

    if (!updatedCliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }

    return updatedCliente;
  }

  // Eliminar un cliente por ID
  async delete(id: string): Promise<void> {
    const result = await this.clienteModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }
  }
}
