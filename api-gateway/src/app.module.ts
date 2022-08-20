import { Module } from '@nestjs/common';
import {
  ClientsModule,
  Transport,
} from '@nestjs/microservices';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SERVICE_UPLOAD',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 9999,
        },
      },
      {
        name: 'SERVICE_MAIN',
        transport: Transport.TCP,
        options: {
          host: 'upload-service',
          port: 9998,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
