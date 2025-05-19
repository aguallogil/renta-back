import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Estatus } from '../models/estatus.model';

@Injectable()
export class EstatusService {
  constructor(@InjectModel(Estatus.name) private readonly estatusModel: Model<Estatus>) {}

  // Crear un nuevo estatus
  async create(createEstatusDto: Partial<Estatus>): Promise<Estatus> {
    const newEstatus = new this.estatusModel(createEstatusDto);
    return newEstatus.save();
  }

  // Obtener todos los estatus
  async findAll(): Promise<Estatus[]> {
    return this.estatusModel.find().exec();
  }

  // Obtener un estatus por ID
  async findById(id: string): Promise<Estatus> {
    const estatus = await this.estatusModel.findById(id).exec();
    if (!estatus) {
      throw new NotFoundException(`Estatus con ID ${id} no encontrado`);
    }
    return estatus;
  }

  // Actualizar un estatus por ID
  async update(id: string, updateEstatusDto: Partial<Estatus>): Promise<Estatus> {
    const updatedEstatus = await this.estatusModel.findByIdAndUpdate(id, updateEstatusDto, {
      new: true, // Devuelve el estatus actualizado
      runValidators: true, // Aplica las validaciones definidas en el esquema
    }).exec();

    if (!updatedEstatus) {
      throw new NotFoundException(`Estatus con ID ${id} no encontrado`);
    }

    return updatedEstatus;
  }

  // Eliminar un estatus por ID
  async delete(id: string): Promise<void> {
    const result = await this.estatusModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(`Estatus con ID ${id} no encontrado`);
    }
  }
}
