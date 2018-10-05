---
layout: post
authors: [hans_vanbellingen]
title: 'Kafka Stream introduction'
image: /img/spring-boot-2/051-thumb.jpg
tags: [Kafka, Stream]
category: Spring
comments: true
---

# Kafka Stream - A practical introduction

##  The Goal

The aim of this article is to give an introduction to Streaming API, and more specificaly to the Kafka streaming API.

Since I'm not really into writing huge loads of theory, I'm going to try and keep the theory to the minimum to understand the basics and dive directly into the code by using an example.
That left the task to find a usefull example, for which I got inspired by the work of some collegues. 
They created an IOT system that measures the usage of the staircase in big buildings with Lora IOT sensors ([Stairway To Health](https://ordina-jworks.github.io/iot/2018/03/14/Stairway-To-Health-2.html)).

So I thought that this is indeed streaming data, the people that open the doors of the staircase are considered as being the stream. 

With that done let's go to the theory ... 

## The theory


## The Practical Part
### Disclaimer
This project is intended as a first step into the world of streaming, so some shortcuts were taken, and not all design decisions are production ready. 
A good example is the use of strings as the content of the messages, this should be done in a more structured way (with [Avro](https://avro.apache.org/) for example).

### Setup of the project
This is the really easy part, to use the streaming api from Kafka only 1 dependency must be added. 
Here is the example to do it in Maven. 
```xml
    <dependencies>
        <dependency>
            <groupId>org.apache.kafka</groupId>
            <artifactId>kafka-streams</artifactId>
            <version>1.1.0</version>
        </dependency>
    </dependencies>
```
And that is it. Sometimes live can be simple :)

### Creation of the input
In the real world this would be done by the IOT devices that send there data through the network to the central system. 
But since it is not easy for demo purposes to have a sensor and a door nearby, and even less handy to open and close it a couple of hundred times to test it out,
I created a simulator that just sends data to the Kafka cluster.

This simulator creates 2 kinds of messages:
* `key = 0E7E346406100585, value = T_7`
configuration information about on which floor a certain device is located.
* `key = 0E7E346406100585, value = pulse@1496309915`
each time a person opens the door the key is the unique id of the device, and then a pulse and the time at which it occurred

```java
 List<String> devices = new ArrayList<>();
devices.add(UUID.randomUUID().toString());
devices.add(UUID.randomUUID().toString());  
devices.add(UUID.randomUUID().toString());

KafkaProducer producer = new KafkaProducer(props);

//send the device information
for (int i = 0; i < devices.size(); i++) {
    String val = String.format("%s@%s@%s", "T", "" + (i + 1), System.currentTimeMillis());
    producer.send(new ProducerRecord("stream_in_dev", devices.get(i), val));
}

try {
    Thread.sleep(1000);
} catch (InterruptedException e) {
}

new Random().ints(10, 0, devices.size()).forEach(i -> {
    producer.send(new ProducerRecord("stream_in", devices.get(i), "pulse@" + System.currentTimeMillis()));
    try {
        Thread.sleep(250);
    } catch (InterruptedException e) {}
});

producer.close();
```

This wil create 3 floors with a random device id, and afterwards send 10 times an event for a random door that it is opened.



### Reading of the output

For checking what happens in the system a data dumper was created that outputs all the messages on all the topics of interest (as well the input, as the output as the intermediate queues).

```java
public class DumpData {
    private static Logger log = LoggerFactory.getLogger(DumpData.class);

    public static void main(String... args) {
        ExecutorService executorService = Executors.newFixedThreadPool(2);
        executorService.submit(() -> {
            KafkaConsumer<String, String> consumer = new KafkaConsumer<>(defaultProperties("your_client_id"));

            List<String> topics = consumer.listTopics().keySet().stream()
                    .filter(streamName -> streamName.startsWith("stream_"))
                    .peek(log::info)
                    .collect(Collectors.toList());

            consumer.subscribe(topics);

            while (true) {
                ConsumerRecords<String, String> records = consumer.poll(100);
                records.forEach(record -> {
                            log.info("topic = {}, partition = {}, offset = {}, key = {}, value = {}",
                                    record.topic(), record.partition(), record.offset(), record.key(), record.value());
                        }
                );
            }
        });
    }
}
```
This will subscribe to all the topics that start with 'stream_' on the Kafka. 

### The main part

So we finally arrived at the part where it all happens. 

Just as a recap, the goal of this stream is to transform both input streams into a stream that gives how many people took the stairs at each floor. 

As a start we must create a new StreamBuilder from the Kafka library
```java
final StreamsBuilder builder = new StreamsBuilder();
```

We need to get the data somewhere, here we get it from the same topics our data simulater writes to.
```java
KStream<String, String> sourceDev = builder.stream("stream_in_dev"); // which device is where
KStream<String, String> stream_in = builder.stream("stream_in"); // the pulse messages
```

The first stream (stream_in_dev) will be converted into a lookup table that is used when handling the second stream. 
This lookup table will contain which device is installed in on what floor.
```java
        KTable<String, String> streamKtableDev = sourceDev
                .groupByKey()
                .reduce((val1, val2) -> val1, Materialized.as("stream_ktable_dev"));
```
Since one of the shortcuts we took is creating all the topics with only one partition we don't have any problems with streams not having the data it needs.
If using multiple partitions, then we should have used or the KGlobalTable 
or make sure that the partitioning is done in such a way that we get the corresponding data from both partitions on this node.

The second stream contains the pulses. Each time a person takes the stair, a message is sent, and this must be added to the counter of the people taking the stairs at that minute.
```java
        stream_in
                .filter((key, value) -> value.startsWith("pulse"))
                .leftJoin(streamKtableDev, (pulse, device) -> device.substring(0, device.lastIndexOf('@')).replace('@', '_') + pulse.substring(pulse.indexOf('@')))
                .map((k, v) -> new KeyValue<>(v.substring(0, v.indexOf('@')), v.substring(v.indexOf('@') + 1)))
                .groupByKey()
                .windowedBy(TimeWindows.of(TimeUnit.MINUTES.toMillis(1)))
                .count()
                .toStream((k, v) -> String.format("%s - %s", k.key(), Date.from(Instant.ofEpochMilli(k.window().start()))))
                .mapValues(v -> "" + v)
                .to("stream_out");
```
This seams to do a lot of things and this is indeed the case. But the API makes a clean chain that is not hard to follow. 
1) We only want the inputs that start with a pulse, the real IOT devices also send battery information and so on, on the same topic.
This could also be solved by sending them to different topics but it shows that filtering is possible
2) we join with the devices lookup table created with the previous KTable statement. This allows us to translate the device id into the location.
pulse@1496309915 -> 
3) we map the message into something more usefull. in stead of the TODO format we now get TODO
4) we want to group these by key
5) but not everything together but by minute
6) and count the number of items. 
This means that the last 3 lines together change the stream into a stream that gives the number of message per minute for a certain floor
7) map the result of this into a new stream that gives the amount per minute
8) send it to the output stream