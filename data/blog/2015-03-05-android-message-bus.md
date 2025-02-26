---
layout: post
title: 'Android Message Bus'
published: false
tags: [android, message bus]
---

http://stackoverflow.com/questions/3987391/why-people-use-message-event-buses-in-their-code
it's the single place when all events in the system flow. Similar architectures are found in computer's motherboards and LAN networks. It's a good approach for motherboards and networks as it reduces the number of wires, but is it good for software development? We don't have such restrictions as electronics does.

Event Bus or message Bus is very simple.

There is a common bus line, so everyone can post message (event) to the bus line and anyone can also subscribe to the bus line so that if any interested event happens, the subscribed can be notified.

To support such functionality, there is a message queue to hold all the

- [Otto](http://square.github.io/otto/) An enhanced event bus with emphasis on Android support

- [greenrobot/EventBus](https://github.com/greenrobot/EventBus)
  Android optimized event bus that simplifies communication between Activities, Fragments, Threads, Services, etc. Less code, better quality.

- [Guava EventBus](https://code.google.com/p/guava-libraries/wiki/EventBusExplained)
