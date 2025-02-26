---
layout: 'post'
title: 'Event Driven Design'
tags: [architecture]
date: '2018-08-21'
---

## Introduction

Observer Pattern

## Centralized Event Management

## Decouple event from event handling

## Implementation

Queue  
Single Thread, queue, watch

Operating System, Kernel mode, user mode

select / epoll model

### GUI Design

Updating UI in dedicated thread. Single Thread UI / main thread

## epoll

## Windows

## Android

AsyncTask

## Vue

`vm._events[event]` stores an array of listener functions: `(vm._events[event] || (vm._events[event] = [])).push(fn)`

- `vm.$emit`
- `vm.$on`
- `vm.$once(event, callback)`
- `vm.$off([event, callback])`

```js
// node_modules/vue/src/core/instance/events.js
export function eventsMixin (Vue: Class<Component>) {
  const hookRE = /^hook:/
  Vue.prototype.$on = function (event: string | Array<string>, fn: Function): Component {
    const vm: Component = this
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        this.$on(event[i], fn)
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn)
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true
      }
    }
    return vm
  }
```

## Javascript Event

[MDN Web Docs - Event](https://developer.mozilla.org/en-US/docs/Web/API/Event)

## Java Event

In Java, we implement event using interface,  
See [Java Swing Events](https://docs.oracle.com/javase/tutorial/uiswing/events/intro.html)

# Event Hierarchy

Centralized management

sub event

distributed management

register

## pub/sub

# Programming Models and Philosophy

A Core Pattern for Events  
Adila A. Krisnadhi1;2 and Pascal Hitzler1  
1 Wright State University, OH, USA  
2 Universitas Indonesia, Depok, Indonesia

## References:

- [Event Sourcing Pattern](https://github.com/mspnp/architecture-center/blob/master/docs/patterns/event-sourcing.md)
-
