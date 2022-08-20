import { map } from 'rxjs/operators';

import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('SERVICE_UPLOAD') private readonly clientOrderApp: ClientProxy,
    // @Inject('SERVICE_AUTH') private readonly clientPaymentApp: ClientProxy,
  ) { }

  //UPLOAD parameter from API
  uploadAudio(file: Express.Multer.File) {
    const pattern = { cmd: 'upload' };
    const payload = { file: file.buffer };
    return this.clientOrderApp
      .send<Buffer>(pattern, payload)
      .pipe(
        map((message: Buffer) => ({ message })),
      );
  }
}
