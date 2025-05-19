import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoriaModule } from './modules/categoria/categoria.module';
import { ArticuloModule } from './modules/articulo/articulo.module';
import { EstatusModule } from './modules/estatus/estatus.module';
import { RentaModule } from './modules/renta/renta.module';
import { ClienteModule } from './modules/cliente/cliente.module';
import { RentaEstatusHistorialModule } from './modules/renta-estatus-historial/renta-estatus-historial.module';
import { NotificacionesModule } from './modules/notificaciones/notificaciones.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),  // Accede a MONGO_URI usando ConfigService
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    } as MongooseModuleOptions),
    AuthModule,
    CategoriaModule,
    ArticuloModule,
    EstatusModule,
    RentaModule,
    ClienteModule,
    RentaEstatusHistorialModule,
    NotificacionesModule,
    ScheduleModule.forRoot()
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
