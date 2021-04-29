import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import ConfigEnum from './config.enum';

export default registerAs(
  ConfigEnum.AUTH,
  (): JwtModuleOptions => ({
    secret: process.env.SECRET || 'mySecret',
    signOptions: {
      expiresIn: process.env.EXPIRES_IN || '60s',
    },
  })
);
