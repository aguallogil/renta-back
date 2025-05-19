import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'clientes' })  // Especifica el nombre de la colección
export class Cliente extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop()
  direccion: string;

  @Prop({ required: true })
  telefono: string;

  @Prop({ required: true })
  status: boolean;  // Estado activo/inactivo del cliente

  @Prop({ default: Date.now })
  createdAt: Date;  // Fecha de creación del cliente
}

export const ClienteSchema = SchemaFactory.createForClass(Cliente);
