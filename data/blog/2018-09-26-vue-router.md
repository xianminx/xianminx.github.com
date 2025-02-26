---
layout: "post"
title: 'vue-router'
published: "true"
tags: [vue, router]
date: "2018-09-26"
---

- History

## API

核心是使用 HTML `window.history` API

- vm

  - $options

    - \_parentVnode

    - $router

    - $route

Vue.util.defineReactive(

- window

  - location

    - ancestorOrigins: DOMStringList {length: 0}

    - assign: ƒ ()

    - `hash`: "#html"

    - host: "router.vuejs.org"

    - hostname: "router.vuejs.org"

    - href: "https://router.vuejs.org/guide/#html"

    - origin: "https://router.vuejs.org"

    - pathname: "/guide/"

    - port: ""

    - protocol: "https:"

    - reload: ƒ reload()

    - replace: ƒ ()

    - `search`: ""

    - toString: ƒ toString()

  - history

  - [performance](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API)

    - Performance Timeline API,

    - the High Resolution Time API,

    - the Navigation Timing API,

    - the User Timing API,

    - the Resource Timing API.

因为安全的问题，不能获取 history stack 列表， 只能 push pop 操作。