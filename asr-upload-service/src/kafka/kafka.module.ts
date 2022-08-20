import { Module } from "@nestjs/common";

import { ConsumerService } from "./consumer.service";
import { ProducerService } from "./producer.service";

@Module({
  // imports:[
  //   ClientsModule.register([
  //     {
  //       name: 'hello-world',
  //       transport: Transport.KAFKA,
  //       options: {
  //         client: {
  //           clientId: 'hero',
  //           brokers: ['localhost:9092'],
  //         },
  //         consumer: {
  //           groupId: 'asr_stream'
  //         }
  //       }
  //     },
  //   ]),
  // ],
  providers: [ProducerService, ConsumerService],
  exports: [ProducerService, ConsumerService],
})
export class KafkaModule {}
