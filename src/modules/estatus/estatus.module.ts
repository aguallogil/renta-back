import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EstatusController } from './controllers/estatus.controller';
import { EstatusService } from './services/estatus.service';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../guards/auth.guard';
import { Estatus, EstatusSchema } from './models/estatus.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Estatus.name, schema: EstatusSchema },
    ]),
    AuthModule,
  ],
  controllers: [EstatusController],
  providers: [
    EstatusService,
    JwtAuthGuard,
  ],
})
export class EstatusModule {}
