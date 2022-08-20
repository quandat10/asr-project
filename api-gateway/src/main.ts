import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = String(3000)

  const config = new DocumentBuilder()
        .setTitle("ASR Upload API")
        .setVersion("1.0")
        .addBearerAuth()
        .addServer(`http://localhost:${port}`)
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, document);
  await app.listen(3000);
}
bootstrap();
