import {
  KafkaStreams,
  KafkaStreamsConfig,
} from 'kafka-streams';
import {
  Consumer,
  ConsumerRunConfig,
  ConsumerSubscribeTopic,
  Kafka,
} from 'kafkajs';

import {
  Injectable,
  OnApplicationShutdown,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { configuration } from '../configs/app.config';

const config: KafkaStreamsConfig = {
  kafkaHost: configuration.streams.kafkaHost,
  groupId: configuration.streams.groupId,
  clientName: configuration.streams.clientName,
  workerPerPartition: configuration.streams.workerPerPartition,
  options: {
    sessionTimeout: configuration.streams.options.sessionTimeout,
    protocol: [configuration.streams.options.protocol],
    fromOffset: configuration.streams.options.fromOffset, //earliest, latest
    fetchMaxBytes: configuration.streams.options.fetchMaxBytes,
    fetchMinBytes: configuration.streams.options.fetchMinBytes,
    fetchMaxWaitMs: configuration.streams.options.fetchMaxWaitMs,
    heartbeatInterval: configuration.streams.options.heartbeatInterval,
    retryMinTimeout: configuration.streams.options.retryMinTimeout,
    requireAcks: configuration.streams.options.requireAcks,
    ackTimeoutMs: configuration.streams.options.ackTimeoutMs,
    //partitionerType: configuration.streams.options.partitionerType
  }
}

@Injectable()
export class ConsumerService implements OnApplicationShutdown {

  constructor(
    private readonly configService: ConfigService,
  ) { }

  private readonly kafka = new Kafka({
    brokers: [this.configService.get("KAFKA_BROKER")],
  });

  private readonly kafkaStreams = new KafkaStreams(config);
  private readonly consumers: Consumer[] = [];

  async consume(topic: ConsumerSubscribeTopic, config: ConsumerRunConfig) {
    const consumer = this.kafka.consumer({ groupId: this.configService.get("TOPIC") });
    await consumer.connect();
    await consumer.subscribe(topic);
    await consumer.run(config);
    this.consumers.push(consumer);

  }

  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }

  async kafkaStreamsConsumer() {
    const stream = this.kafkaStreams.getKStream(this.configService.get("TOPIC"));
    stream.start().then(() => {
      setTimeout(this.kafkaStreams.closeAll.bind(this.kafkaStreams), 5000);
    });
  }
}
