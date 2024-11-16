import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { EnvService } from './infra/env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false,
  })
  const envService = app.get(EnvService)
  const config = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('Personal Blog API')
    .setVersion('1.0')
    .addTag('blog')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  const port = envService.get('PORT')

  await app.listen(port)
}

bootstrap();
