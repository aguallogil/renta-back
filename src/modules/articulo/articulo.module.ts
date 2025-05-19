import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticuloController } from './controllers/articulo.controller';
import { ArticuloService } from './services/articulo.service';
import { Articulo, ArticuloSchema } from './models/articulo.model';
import { Categoria, CategoriaSchema } from 'src/modules/categoria/models/categoria.model';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../guards/auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Articulo.name, schema: ArticuloSchema },
      { name: Categoria.name, schema: CategoriaSchema }
    ]),
    AuthModule,
  ],
  controllers: [ArticuloController],
  providers: [
    ArticuloService,
    JwtAuthGuard,
  ],
})
export class ArticuloModule {}
