import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'notificaciones' })
export class PushSubscription extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  usuario: Types.ObjectId;

  @Prop({ required: true })
  endpoint: string;

  @Prop({ type: Object })
keys: {
  auth: string;
  p256dh: string;
};


  @Prop({ default: Date.now })
  creadoEn: Date;
}

export const PushSubscriptionSchema = SchemaFactory.createForClass(PushSubscription);
