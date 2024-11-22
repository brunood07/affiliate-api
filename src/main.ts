import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { EnvService } from './infra/env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {})

  app.enableCors({
    origin: 'https://affiliate-ui.vercel.app',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  const envService = app.get(EnvService)
  const config = new DocumentBuilder()
    .setTitle('Affiliate API')
    .setDescription('Affiliate System API')
    .setVersion('1.0')
    .build();
  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  const port = envService.get('PORT')

  await app.listen(port)
}

bootstrap();
