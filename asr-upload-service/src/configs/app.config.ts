import data from './appconfig.json';

export default (): Record<string, unknown> => ({
    KAFKA_BROKER: "localhost:9092",
    TOPIC:"asr_stream",
})

export const configuration = data;