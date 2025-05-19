import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RentaEstatusHistorial } from '../models/renta-estatus-historial.model';

@Injectable()
export class RentaEstatusHistorialService {
  constructor(
    @InjectModel(RentaEstatusHistorial.name)
    private readonly historialModel: Model<RentaEstatusHistorial>,
  ) {}

  async create(data: {
    renta: string;
    estatus: string;
    fecha?: Date;
  }): Promise<RentaEstatusHistorial> {
    const historial = new this.historialModel({
      renta: data.renta,
      estatus: data.estatus,
      fecha: data.fecha || new Date(),
    });
    return historial.save();
  }

  // (Opcional) Obtener historial de una renta
  async findByRenta(rentaId: string): Promise<RentaEstatusHistorial[]> {
    return this.historialModel
      .find({ renta: rentaId })
      .populate('estatus')
      .sort({ fecha: 1 })
      .exec();
  }
}
