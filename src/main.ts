
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as  cfenv from 'cfenv';

async function bootstrap() {
  const appEnv = cfenv.getAppEnv();
  const schemes  = appEnv.getService('readingroom').credentials.Schemes;
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { cors: true },
  );
  const options = new DocumentBuilder()
    .setTitle('Microservice to BCS Reading Room')
    .setDescription('Cloud Foundry')
    .setVersion('0.0.0.1')
    .setSchemes(schemes)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(appEnv.port, appEnv.bind);
}
bootstrap();
