import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClienteController } from './controllers/cliente.controller';
import { ClienteService } from './services/cliente.service';
import { Cliente, ClienteSchema } from './models/cliente.model';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../guards/auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cliente.name, schema: ClienteSchema },
    ]),
    AuthModule,
  ],
  controllers: [ClienteController],
  providers: [
    ClienteService,
    JwtAuthGuard,
  ],
})
export class ClienteModule {}
