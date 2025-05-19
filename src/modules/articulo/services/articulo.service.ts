import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Articulo } from '../models/articulo.model';

@Injectable()
export class ArticuloService {
  constructor(
    @InjectModel(Articulo.name) private readonly articuloModel: Model<Articulo>
  ) {}

  // Crear un nuevo artículo
  async create(createArticuloDto: Partial<Articulo>): Promise<Articulo> {
    const newArticulo = new this.articuloModel(createArticuloDto);
    return newArticulo.save();
  }

  // Obtener todos los artículos
  async findAll(): Promise<Articulo[]> {
    return this.articuloModel.find().populate('categoria').exec();
  }

  // Obtener un artículo por ID
  async findById(id: string): Promise<Articulo> {
    const articulo = await this.articuloModel.findById(id).populate('categoria').exec();
    if (!articulo) {
      throw new NotFoundException(`Artículo con ID ${id} no encontrado`);
    }
    return articulo;
  }

  // Actualizar un artículo por ID
  async update(id: string, updateArticuloDto: Partial<Articulo>): Promise<Articulo> {
    const updatedArticulo = await this.articuloModel.findByIdAndUpdate(
      id,
      updateArticuloDto,
      { new: true, runValidators: true }
    ).populate('categoria').exec();

    if (!updatedArticulo) {
      throw new NotFoundException(`Artículo con ID ${id} no encontrado`);
    }

    return updatedArticulo;
  }

  // Eliminar un artículo por ID
  async delete(id: string): Promise<void> {
    const result = await this.articuloModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(`Artículo con ID ${id} no encontrado`);
    }
  }
}
