import path from 'path';
import { registerAs } from '@nestjs/config';
import ConfigEnum from './config.enum';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const DATABASE_TYPE = 'postgres';

const rootDir = path.resolve(__dirname, '..');

export default registerAs(
  ConfigEnum.DATABASE,
  (): TypeOrmModuleOptions => ({
    type: DATABASE_TYPE,
    name: process.env.DATABASE_CONNECTION || 'default',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '', 10) || 5432,
    username: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWD || 'password',
    database: process.env.DATABASE_NAME || 'postgres',
    entities: [`${rootDir}/**/*.entity{.ts,.js}`],
    migrations: [`${rootDir}/migrations/*{.ts,.js}`],
    migrationsRun: true,
    synchronize: true,
    logging: ['query', 'error', 'warn', 'migration'],
  })
);
