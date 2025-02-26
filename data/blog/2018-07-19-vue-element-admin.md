---
layout: "post"
title: 'vue-element-admin'
published: "true"
tags: [css, web]
date: "2018-07-19"
---

- [axios](#axios)

- [mock.js](#mockjs)

  - [random](#random)

- [ES2015+](#es2015)

- [vuex](#vuex)

- [vue-router](#vue-router)

## [axios](https://github.com/axios/axios)

Promise based HTTP client for the browser and node.js

<script src="https://gist.github.com/xianminx/191836ec069780f2ad282f3798b0252c.js"></script>

## [mock.js](http://mockjs.com/)

create project and download deps.

```sh
vue create hello_mockjs
cd hello_mockjs
npm install mockjs

npm run serve
```

- 数据模板定义规范 DTD
  ` 'name|rule': value `

### random

Random is a useful nodejs commandline / library for generating random objects, like url, email, etc.

```sh
npm install random -g
```

```sh
➜  hello_mockjs git:(master) ✗ random

  Usage: random [options] [command]

  Options:

    -V, --version  output the version number
    -h, --help     output usage information

  Commands:

    boolean        Random.boolean( min,  max,  cur )
    bool           Random.bool( min,  max,  cur )
    natural        Random.natural( min,  max )
    integer        Random.integer( min,  max )
    int            Random.int( min,  max )
    float          Random.float( min,  max,  dmin,  dmax )
    character      Random.character( pool )
    char           Random.char( pool )
    string         Random.string( pool,  min,  max )
    str            Random.str()
    range          Random.range( start,  stop,  step )
    date           Random.date( format )
    time           Random.time( format )
    datetime       Random.datetime( format )
    now            Random.now( unit,  format )
    image          Random.image( size,  background,  foreground,  format,  text )
    img            Random.img()
    color          Random.color( name )
    hex            Random.hex()
    rgb            Random.rgb()
    rgba           Random.rgba()
    hsl            Random.hsl()
    paragraph      Random.paragraph( min,  max )
    cparagraph     Random.cparagraph( min,  max )
    sentence       Random.sentence( min,  max )
    csentence      Random.csentence( min,  max )
    word           Random.word( min,  max )
    cword          Random.cword( pool,  min,  max )
    title          Random.title( min,  max )
    ctitle         Random.ctitle( min,  max )
    first          Random.first()
    last           Random.last()
    name           Random.name( middle )
    cfirst         Random.cfirst()
    clast          Random.clast()
    cname          Random.cname()
    url            Random.url( protocol,  host )
    protocol       Random.protocol()
    domain         Random.domain( tld )
    tld            Random.tld()
    email          Random.email( domain )
    ip             Random.ip()
    region         Random.region()
    province       Random.province()
    city           Random.city( prefix )
    county         Random.county( prefix )
    zip            Random.zip( len )
    d4             Random.d4()
    d6             Random.d6()
    d8             Random.d8()
    d12            Random.d12()
    d20            Random.d20()
    d100           Random.d100()
    guid           Random.guid()
    uuid           Random.uuid()
    id             Random.id()
  Examples:

    $ random date yyyy-MM-dd
    $ random time HH:mm:ss
```

## ES2015+

## vuex

每一个 Vuex 应用的核心就是 store（仓库）。“store”基本上就是一个容器，它包含着你的应用中大部分的状态 (state)。

- reactive in store state vars.

- commit mutation

## vue-router

# Questions

- ` import request from '@/utils/request' ` what is @?

- requests interceptor 中 set login token

- response interceptor 中验证 response 错误

- [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

  ```js
  sidebar: state => state.app.sidebar,
  ```

- store

  - getters

  - [store modules](https://vuex.vuejs.org/guide/modules.html)

    ```js
    const store = new Vuex.Store({
      modules: {
        app,
        user,
      },
      getters,
    })

    export default store
    ```

- export function

- router
  ```js
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  ```

- vuex

  - getters

  - mapGetters

  - mutations