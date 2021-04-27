import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import ConfigEnum from 'config/config.enum';
import { SharedConfig } from 'config/shared.config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);
  const config = configService.get<SharedConfig>(ConfigEnum.SHARED);

  await app.listen(config?.port || 3000);
}
bootstrap();
