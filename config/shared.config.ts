import { registerAs } from '@nestjs/config';
import ConfigEnum from './config.enum';

export interface SharedConfig {
  port: number;
}

export default registerAs(ConfigEnum.SHARED, () => ({
  port: parseInt(process.env.PORT || '', 10) || 3000,
}));
