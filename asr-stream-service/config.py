import asyncio

# env Variable
KAFKA_BOOTSTRAP_SERVERS= "localhost:9092"
KAFKA_TOPIC="asr_stream"
KAFKA_TOPIC_RESULT="asr_stream_result"

KAFKA_CONSUMER_GROUP="DEMO"
loop = asyncio.get_event_loop()
