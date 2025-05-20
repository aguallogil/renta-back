import { Injectable } from '@nestjs/common';
import * as webpush from 'web-push';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PushSubscription as PushSubscriptionDocument } from '../models/push-subscription.model';
import { ConfigService } from '@nestjs/config';
// Llaves VAPID generadas con webpush.generateVAPIDKeys()


@Injectable()
export class NotificacionesService {
  constructor(
    @InjectModel(PushSubscriptionDocument.name)
    private readonly subModel: Model<PushSubscriptionDocument>,
    private readonly configService: ConfigService
  ) {
    webpush.setVapidDetails(
      this.configService.get<string>('VAPID_EMAIL'),
      this.configService.get<string>('VAPID_PUBLIC_KEY'),
      this.configService.get<string>('VAPID_PRIVATE_KEY'),
    );
  }

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
