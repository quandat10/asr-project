import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { ProducerService } from './kafka/producer.service';

@Controller()
export class AppController {

  constructor(
    private readonly producerService: ProducerService,
  ){}

  @MessagePattern({ cmd: 'upload' })
  async uploadAudio(data:any) {
    await this.producerService.kafkaStreamsProduce(Buffer.from(data.file.data))
    return {
      msg:"success"
    };
  }
}
