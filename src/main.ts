import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import 'dotenv/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());

  //swagger
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('The API descriptionn')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/explorer', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`API is running on: http://localhost:${port}`);
  console.log(`Swagger is available at: http://localhost:${port}/api/explorer`);
}
bootstrap();
