import { Injectable } from '@nestjs/common';
import * as webpush from 'web-push';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PushSubscription as PushSubscriptionDocument } from '../models/push-subscription.model';

// Llaves VAPID generadas con webpush.generateVAPIDKeys()
const VAPID_KEYS = {
  publicKey: 'BCLNL1qLdW2hGFyqrx4Eifn2lUSLb9mHAh8ciUOshZaz9ete8Q9H6kubvCwlfJX9hWoNbu60rYLFE83R4p48MhQ',
  privateKey: 'HxfkVqjyNWDsDCbKKVl7ORvS-fnoeifjuDByh2De2qI',
};

webpush.setVapidDetails(
  'mailto:tuemail@dominio.com',
  VAPID_KEYS.publicKey,
  VAPID_KEYS.privateKey,
);

@Injectable()
export class NotificacionesService {
  constructor(
    @InjectModel(PushSubscriptionDocument.name)
    private readonly subModel: Model<PushSubscriptionDocument>,
  ) {}

  async registrar(sub: any, userId: string): Promise<void> {
    const existe = await this.subModel.findOne({ endpoint: sub.endpoint });
    if (!existe) {
      await new this.subModel({
        usuario: userId,
        endpoint: sub.endpoint,
        keys: sub.keys,
      }).save();
    }
  }

  async obtenerTodasLasSuscripciones(): Promise<PushSubscriptionDocument[]> {
  return this.subModel.find().exec();
}

async enviarANotificacion(sub: PushSubscriptionDocument, payload: any) {
    try {
        await webpush.sendNotification(sub, JSON.stringify(payload));
      } catch (err: any) {
        console.error('WebPushError statusCode:', err.statusCode);
        console.error('WebPushError body:', err.body);
      }
}

}
