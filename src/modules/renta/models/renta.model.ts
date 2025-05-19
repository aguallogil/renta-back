import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Articulo } from 'src/modules/articulo/models/articulo.model';
import { Cliente } from 'src/modules/cliente/models/cliente.model';
import { Estatus } from 'src/modules/estatus/models/estatus.model';

@Schema({ collection: 'rentas' })  // Especifica el nombre de la colección
export class Renta extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Articulo' })
  articulo: Types.ObjectId;  // Referencia al modelo Articulo

  @Prop({ required: true, type: Types.ObjectId, ref: 'Cliente' })
  cliente: Types.ObjectId;  // Referencia al modelo Cliente

  @Prop({ required: true, type: Types.ObjectId, ref: 'Estatus' })
  estatus: Types.ObjectId;  // Referencia al modelo Estatus

  @Prop({ required: true })
  fhInicio: Date;  // Fecha y hora de inicio de la renta

  @Prop({ required: true })
  fhFin: Date;  // Fecha y hora de fin de la renta

  @Prop()
  fhRecoleccion: Date;  // Fecha y hora de recolección del artículo

  @Prop()
  comentarios: string;  // Comentarios adicionales

  @Prop({ default: Date.now })
  createdAt: Date;  // Fecha de creación
}

export const RentaSchema = SchemaFactory.createForClass(Renta);
