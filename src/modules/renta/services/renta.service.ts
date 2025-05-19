import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Renta } from '../models/renta.model';

@Injectable()
export class RentaService {
  constructor(
    @InjectModel(Renta.name) private readonly rentaModel: Model<Renta>,
  ) {}

  // Crear una nueva renta
  async create(createRentaDto: Partial<Renta>): Promise<Renta> {
    const newRenta = new this.rentaModel(createRentaDto);
    return newRenta.save();
  }

  // Obtener todas las rentas
  async findAll(): Promise<Renta[]> {
    return this.rentaModel
      .find()
      .populate('articulo')
      .populate('cliente')
      .populate('estatus')
      .exec();
  }

  // Obtener una renta por ID
  async findById(id: string): Promise<Renta> {
    const renta = await this.rentaModel
      .findById(id)
      .populate('articulo')
      .populate('cliente')
      .populate('estatus')
      .exec();

    if (!renta) {
      throw new NotFoundException(`Renta con ID ${id} no encontrada`);
    }

    return renta;
  }

  // Actualizar una renta por ID
  async update(id: string, updateRentaDto: Partial<Renta>): Promise<Renta> {
    const updatedRenta = await this.rentaModel
      .findByIdAndUpdate(id, updateRentaDto, {
        new: true,
        runValidators: true,
      })
      .populate('articulo')
      .populate('cliente')
      .populate('estatus')
      .exec();

    if (!updatedRenta) {
      throw new NotFoundException(`Renta con ID ${id} no encontrada`);
    }

    return updatedRenta;
  }

  // Eliminar una renta por ID
  async delete(id: string): Promise<void> {
    const result = await this.rentaModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(`Renta con ID ${id} no encontrada`);
    }
  }
  async obtenerVencenHoy(inicio: Date, fin: Date): Promise<Renta[]> {
    return this.rentaModel.find({
      fhFin: { $gte: inicio, $lte: fin }
    }).populate('estatus cliente articulo').exec();
  }
  
}
