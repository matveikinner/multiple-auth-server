import { registerAs } from '@nestjs/config';
import { ValidationPipeOptions } from '@nestjs/common';
import ConfigEnum from './config.enum';

export default registerAs(
  ConfigEnum.VALIDATION,
  (): ValidationPipeOptions => ({
    skipMissingProperties: false,
    whitelist: true,
    forbidNonWhitelisted: false,
    forbidUnknownValues: false,
    disableErrorMessages: false,
    dismissDefaultMessages: false,
  })
);
