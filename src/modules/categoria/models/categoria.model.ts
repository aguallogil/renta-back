import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
@Schema()
export class Categoria {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    status: boolean;
}
export const CategoriaSchema = (mongoose.models.Categoria || SchemaFactory.createForClass(Categoria)) as Model<Categoria>;