import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { IEnvVariables } from './common/types/envVariables.types';

(async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const envVariables = app.get(ConfigService<IEnvVariables, true>);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors({ origin: '*' });

  const swaggerConfig = new DocumentBuilder().setTitle('Retool Demo API').setDescription('').build();
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('', app, swaggerDoc);

  await app.listen(envVariables.get('APP_PORT'), () =>
    console.log(`Listening on port ${envVariables.get('APP_PORT')}`),
  );
})();
