import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'estatus' }) 
export class Estatus extends Document {
  @Prop({ required: true })
  name: string;
}

export const EstatusSchema = SchemaFactory.createForClass(Estatus);
