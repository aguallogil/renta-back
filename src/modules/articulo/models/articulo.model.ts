import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Categoria } from 'src/modules/categoria/models/categoria.model';

@Schema({ collection: 'articulos' }) 
export class Articulo extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Categoria' })
  categoria: Types.ObjectId;  // Referencia al modelo Categoria

  @Prop({ required: true })
  status: boolean;

  @Prop()
  comentarios: string;  // Campo adicional para comentarios

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ArticuloSchema = SchemaFactory.createForClass(Articulo);
