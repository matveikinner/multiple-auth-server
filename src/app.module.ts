import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import sharedConfig from 'config/shared.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [sharedConfig],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
