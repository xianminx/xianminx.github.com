---
layout: 'post'
title: 'Create your own Ethereum token'
tags: [ethereum]
date: '2018-02-23'
---

## web3j.io

Use local geth client

RPC client mode

- Infura

- local

  - RPC

  - IPC

### Java Smart Contract Wrapper

#### Build and compile

solc

## ENS

Ethereum Name Service

## Hello, world!

[https://www.ethereum.org/greeter](https://www.ethereum.org/greeter)

1. Install ethereum command line tools

Clients

- Geth: Go implementation Ethereum implementation

- Parity:

- Eth: The C++ implementation is simply called Eth. If you want added security by running two different implementations in parallel or are serious about GPU mining, then the C++ "Eth" client is for you.

- Pyethapp: The Python implementation is called Pyethapp. If you are interested in understanding how Ethereum works and how to extend it, the code base of this client is probably the most readable and has a great contract tester library with fast development cycles. It is not meant for high-end usage as performance in this client is not as high priority as clarity and reliability. If you are a Python developer that wants to build decentralized apps or are interested in Ethereum for research or an academic purpose, this is a great client: we invite you to take a look and contribute to it.

- Parity a Rust implementation by Parity Technologies

- A Haskell implementation developed by Blockapps

- If you are interested in developing a light application that will run entirely in a web browser, then we recommend using EthereumJS as a basis.

- If you want to create a small hardware project, look into the implementation for the Raspberry Pi

- If you want to install geth for non-ubuntu linux then we recommend you look into building from source

- If you want more flexibility on the Mac, try Homebrew

# Solidity

Solidity is the major language to develop smart contracts on Ethereum blockchain. The documentation is at [https://solidity.readthedocs.io/en/develop/](https://solidity.readthedocs.io/en/develop/)

##

### Editors & IDEs

- [Remix](https://remix.ethereum.org/): Browser-based IDE with integrated compiler and Solidity runtime environment without server-side components.

- [IntelliJ IDEA plugin](https://plugins.jetbrains.com/plugin/14729-solidity): Solidity plugin for IntelliJ IDEA (and all other JetBrains IDEs)

## SWARM

decentralized storage service, like ipfs.

The swarm of Swarm is the collection of nodes of the devp2p network each of which run the bzz protocol on the same network id.

![Swarm](https://i.stack.imgur.com/5MaQm.png)

## ABI

solc compiler

## Events

# misc

Whisper: decentralized messaging protocol

## geth: command line tools

geth is listening on UDP/TCP port 30303

```sh
ps aux |grep geth
lucas            19806  35.5  8.0 558645868 1348204 s001  S+    4:24PM   1:45.52 geth console
lucas            20355   0.0  0.0  4267768    892 s004  S+    4:30PM   0:00.00 grep geth
```

```sh
lsof -i -a -p 19806
COMMAND   PID  USER   FD   TYPE            DEVICE SIZE/OFF NODE NAME
geth    19806 lucas   13u  IPv6 0x9295f2087a46ab9      0t0  UDP *:30303
geth    19806 lucas   16u  IPv4 0x9295f208ea01d21      0t0  TCP 192.168.1.116:64563->39.107.26.140:61910 (ESTABLISHED)
geth    19806 lucas   21u  IPv6 0x9295f2082d4f599      0t0  TCP *:30303 (LISTEN)
geth    19806 lucas   28u  IPv4 0x9295f208f6f6101      0t0  TCP 192.168.1.116:63606->ns3066492.ip-79-137-70.eu:30303 (ESTABLISHED)
geth    19806 lucas   39u  IPv4 0x9295f208ec0e101      0t0  TCP 192.168.1.116:64180->hst-46-166-161-114.balticservers.eu:30303 (ESTABLISHED)
geth    19806 lucas   66u  IPv4 0x9295f2082332101      0t0  TCP 192.168.1.116:64552->47.74.5.209:30821 (SYN_SENT)
geth    19806 lucas   75u  IPv4 0x9295f20823fed21      0t0  TCP 192.168.1.116:64070->47.104.15.188:30303 (ESTABLISHED)
geth    19806 lucas   88u  IPv4 0x9295f20a183d681      0t0  TCP 192.168.1.116:64559->101.207.224.48:40145 (SYN_SENT)
```

## Ethereum Network Visualization

[http://ethviewer.live/](http://ethviewer.live/)
![ethviewer.live](imgs/ethviewer.live.jpg)

[https://ethstats.net/](https://ethstats.net/)

![ethstats.net](imgs/ethstats.net.jpg)

## 0x

mempools

Operations on orders:

- generating,

- signing,

- filling and

- cancelling,

- verifying an orders signature,

- setting or checking a users ERC20 token balance/allowance

- and much more.

TestRPC

```sh
➜  0x.js-starter-project git:(master) ✗ yarn testrpc

yarn run v1.5.1
$ testrpc -p 8545 --networkId 50 --db ./0x_testrpc_snapshot -m "${npm_package_config_mnemonic}"
```
