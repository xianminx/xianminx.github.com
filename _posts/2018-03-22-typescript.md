---
layout: post
title: "TypeScript"
published: true
tags: [typescript]
---
# TypeScript

TypeScript is a superset for javascript, enabling us to write more elegant javascript code. 


[TypeScript in 5 minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)

## Process

TypeScript --> Javascript --> Nodejs

1. use `tsc` to transpile TypeScript into JavaScript, 
2. then run js by nodejs or browser. 


## Install
```sh
npm install -g typescript
tsc --version
Version 2.7.2

tsc --help

```

## Project management

### structure
See []()
```sh
➜  typescript101 git:(master) ✗ tree
.
├── HelloWorld.js
├── HelloWorld.js.map
├── HelloWorld.ts
├── README.md
├── greeter.html
├── greeter.js
├── greeter.js.map
├── greeter.ts
└── tsconfig.json

```

### with Visual Studio Code
[Editing TypeScript in VSCode](https://code.visualstudio.com/docs/languages/typescript)
* File Scope
* Explicit Project

### tsconfig.json
This is the project definition file. 

