---
layout: "post"
title: 'TypeScript'
published: "true"
tags: [typescript]
date: "2018-03-22"
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

See [typescript101](https://github.com/xianminx/typescript101)

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

### With Visual Studio Code

> Warning: Visual Studio for Mac Community Edition does not support TypeScript natively.  
> So if on Mac, use Visual Studio Code instead.  
> or Use Visual Studio on Windows for better IDE support.

References:

1. [Editing TypeScript in VSCode](https://code.visualstudio.com/docs/languages/typescript)
2. [Simplest TypeScript project using Visual Studio Code](https://medium.com/@equisept/simplest-typescript-with-visual-studio-code-e42843fe437)

- File Scope

- Explicit Project

### tsconfig.json

This is the project definition file.