import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriaController } from './controllers/categoria.controller';
import { CategoriaService } from './services/categoria.service';
import { Categoria, CategoriaSchema } from './models/categoria.model';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../guards/auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Categoria.name, schema: CategoriaSchema }]),
  AuthModule],
  controllers: [CategoriaController],
  providers: [CategoriaService,JwtAuthGuard],
})
export class CategoriaModule {}
