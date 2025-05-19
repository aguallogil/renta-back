import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RentaController } from './controllers/renta.controller';
import { RentaService } from './services/renta.service';
import { Renta, RentaSchema } from './models/renta.model';
import { Articulo, ArticuloSchema } from 'src/modules/articulo/models/articulo.model';
import { Cliente, ClienteSchema } from 'src/modules/cliente/models/cliente.model';
import { Estatus, EstatusSchema } from 'src/modules/estatus/models/estatus.model';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../guards/auth.guard';
import { RentaEstatusHistorialModule } from 'src/modules/renta-estatus-historial/renta-estatus-historial.module';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Renta.name, schema: RentaSchema },
      { name: Articulo.name, schema: ArticuloSchema },
      { name: Cliente.name, schema: ClienteSchema },
      { name: Estatus.name, schema: EstatusSchema },
    ]),
    AuthModule,
    RentaEstatusHistorialModule
  ],
  controllers: [RentaController],
  providers: [
    RentaService,
    JwtAuthGuard,
  ],
})
export class RentaModule {}
