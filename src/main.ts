import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import ConfigEnum from 'config/config.enum';
import { SharedConfig } from 'config/shared.config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);
  const sharedconfig = configService.get<SharedConfig>(ConfigEnum.SHARED);
  const validationConfig = configService.get<ValidationPipeOptions>(ConfigEnum.VALIDATION);

  app.useGlobalPipes(new ValidationPipe(validationConfig));

  await app.listen(sharedconfig?.port || 3000);
}
bootstrap();
