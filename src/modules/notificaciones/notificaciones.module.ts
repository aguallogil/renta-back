import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificacionesService } from './services/notificaciones.service';
import { RecordatoriosService } from './services/recordatorios.service';
import { PushSubscription, PushSubscriptionSchema } from './models/push-subscription.model';
import { Renta, RentaSchema } from 'src/modules/renta/models/renta.model';
import { RentaService } from 'src/modules/renta/services/renta.service';
import { NotificacionesController } from './controllers/notificaciones.controller';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PushSubscription.name, schema: PushSubscriptionSchema },
      { name: Renta.name, schema: RentaSchema },
    ]),
    AuthModule,
  ],
  controllers:[NotificacionesController],
  providers: [NotificacionesService, RecordatoriosService, RentaService],
  exports: [NotificacionesService],
})
export class NotificacionesModule {}
