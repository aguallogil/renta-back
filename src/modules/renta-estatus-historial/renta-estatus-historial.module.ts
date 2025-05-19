import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RentaEstatusHistorial, RentaEstatusHistorialSchema } from './models/renta-estatus-historial.model';
import { RentaEstatusHistorialService } from './services/renta-estatus-historial.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RentaEstatusHistorial.name, schema: RentaEstatusHistorialSchema },
    ]),
  ],
  providers: [RentaEstatusHistorialService],
  exports: [RentaEstatusHistorialService], // Exportas el servicio para usarlo en RentaService
})
export class RentaEstatusHistorialModule {}
