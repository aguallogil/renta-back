import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'renta_estatus_historial' })
export class RentaEstatusHistorial extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Renta', required: true })
  renta: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Estatus', required: true })
  estatus: Types.ObjectId;

  @Prop({ default: Date.now })
  fecha: Date;
}

export const RentaEstatusHistorialSchema = SchemaFactory.createForClass(RentaEstatusHistorial);
