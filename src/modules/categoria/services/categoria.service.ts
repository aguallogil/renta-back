import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categoria } from '../models/categoria.model';


@Injectable()
export class CategoriaService {
  constructor(@InjectModel(Categoria.name) private readonly categoriaModel: Model<Categoria>) {}

  // Crear una nueva categoría
  async create(createCategoriaDto: Partial<Categoria>): Promise<Categoria> {
    const newCategoria = new this.categoriaModel(createCategoriaDto);
    return newCategoria.save();
  }

  // Actualizar una categoría existente
  async update(id: string, updateCategoriaDto: Partial<Categoria>): Promise<Categoria> {
    const updatedCategoria = await this.categoriaModel.findByIdAndUpdate(id, updateCategoriaDto, {
      new: true, // Devuelve la categoría actualizada
      runValidators: true, // Aplica las validaciones definidas en el esquema
    }).exec();

    if (!updatedCategoria) {
      throw new NotFoundException(`Categoria con ID ${id} no encontrada`);
    }

    return updatedCategoria;
  }

  // Listar todas las categorías
  async findAll(): Promise<Categoria[]> {
    return this.categoriaModel.find().exec();
  }

  // Eliminar una categoría
  async delete(id: string): Promise<void> {
    const result = await this.categoriaModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(`Categoria con ID ${id} no encontrada`);
    }
  }
}
