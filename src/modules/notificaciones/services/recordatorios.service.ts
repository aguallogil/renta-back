import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RentaService } from '../../renta/services/renta.service';
import { NotificacionesService } from './notificaciones.service';
import { PushSubscription as PushSubscriptionDocument } from '../models/push-subscription.model';
import * as crypto from 'crypto';
(global as any).crypto = crypto;


@Injectable()
export class RecordatoriosService {
  private readonly logger = new Logger(RecordatoriosService.name);

  constructor(
    private readonly rentaService: RentaService,
    private readonly notiService: NotificacionesService,
  ) {}

  @Cron('*/30 * * * * *') // cada 30 segundos
  async enviarNotificaciones() {
    const ahora = new Date();

    const hoyInicio = new Date(
      ahora.getFullYear(),
      ahora.getMonth(),
      ahora.getDate(),
      0, 0, 0, 0
    );

    const hoyFin = new Date(
      ahora.getFullYear(),
      ahora.getMonth(),
      ahora.getDate(),
      23, 59, 59, 999
    );

    const rentas = await this.rentaService.obtenerVencenHoy(hoyInicio, hoyFin);
    if (!rentas.length) {
      this.logger.log('No hay rentas que venzan hoy');
      return;
    }

    const suscripciones: PushSubscriptionDocument[] = await this.notiService.obtenerTodasLasSuscripciones();

    for (const suscripcion of suscripciones) {
      for (const renta of rentas) {
        const estatusNombre = (renta.estatus as any)?.name ?? renta.estatus;
        const articuloNombre = (renta.articulo as any)?.name ?? renta.articulo;
        const clienteNombre = (renta.cliente as any)?.nombre ?? renta.cliente;

        if (estatusNombre !== 'Recogido') {
          const payload = {
            title: 'Recordatorio de Renta',
            body: `La renta del artículo "${articuloNombre}" para ${clienteNombre} vence hoy.`,
            data: { rentaId: renta._id },
          };

          await this.notiService.enviarANotificacion(suscripcion, payload);
          this.logger.log(`Notificación enviada a ${suscripcion.endpoint} sobre la renta de ${clienteNombre}`);
        }
      }
      }
  }
}
