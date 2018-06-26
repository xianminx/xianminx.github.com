---
layout: post
title: "Ethereum and Solidity"
published: true
tags: [spring, java]
---


## Tooling
* Remix
* npm / Node.js

web3j
web3.js



## Introduction to Smart Contracts
Solidity 是 Ethereum 上智能合约实现的主要语言之一。 
运行在 EVM 上。 
* static typing
* variadic return types
* Complex member variables for contracts including arbitrarily hierarchical mappings and structs 
* Contracts support inheritance, including multiple inheritance with C3 linearization.
* An application binary interface (ABI) facilitating multiple type-safe functions within a single contract was also introduced (and later supported by Serpent).
* A documentation system for specifying a user-centric description of the ramifications of a method-call was also included in the proposal, known as "Natural Language Specification".
* on EVM
* compile to bytecode 
* designed around ECMAScript


### Blockchain Basics
* Transactions
* Blocks
* EVM
    * Accounts: external accounts controlled by public private key pairs
    * contract accounts controlled by the code stored together with the account. 
    * Every account has a persistent key-value store mapping 256-bit words to 256-bit words called storage.

* Storage:a key-value store that maps 256-bit words to 256-bit words.  It is not possible to enumerate storage from within a contract and it is comparatively costly to read and even more so, to modify storage. A contract can neither read nor write to any storage apart from its own.
* Memory:  a contract obtains a freshly cleared instance for each message call. Memory is linear and can be addressed at byte level, but reads are limited to a width of 256 bits, while writes can be either 8 bits or 256 bits wide. Memory is expanded by a word (256-bit), when accessing (either reading or writing) a previously untouched memory word (ie. any offset within a word). At the time of expansion, the cost in gas must be paid. Memory is more costly the larger it grows (it scales quadratically).
* Stack
* Instruction Set
* Message Calls
* Delegatecall / Callcode and Libraries
* Logs
* Create
* self-destruct
* 


## Installing the Solidity Compiler
## Solidity by Example
## Solidity in Depth
## Security Considerations
## Using the compiler
## Contract Metadata
## Application Binary Interface Specification
## Joyfully Universal Language for (Inline) Assembly
## Style Guide
## Common Patterns
## List of Known Bugs
## Contributing
## Frequently Asked Questions
## 


## Gloabal variable

### Ether Units

* wei, 
* finney, 
* szabo or 
* ether

### Time Units
* 1 == 1 seconds
* 1 minutes == 60 seconds
* 1 hours == 60 minutes
* 1 days == 24 hours
* 1 weeks == 7 days
* 1 years == 365 days

### Globals 
* block.blockhash(uint blockNumber) returns (bytes32): hash of the given block - only works for 256 most recent blocks excluding current
* block.coinbase (address): current block miner’s address
* block.difficulty (uint): current block difficulty
* block.gaslimit (uint): current block gaslimit
* block.number (uint): current block number
* block.timestamp (uint): current block timestamp as seconds since unix epoch
* gasleft() returns (uint256): remaining gas
* msg.data (bytes): complete calldata
* msg.gas (uint): remaining gas - deprecated in version 0.4.21 and to be replaced by gasleft()
* msg.sender (address): sender of the message (current call)
* msg.sig (bytes4): first four bytes of the calldata (i.e. function identifier)
* msg.value (uint): number of wei sent with the message
* now (uint): current block timestamp (alias for block.timestamp)
* tx.gasprice (uint): gas price of the transaction
* tx.origin (address): sender of the transaction (full call chain)


### Error Handling
* assert(bool condition): throws if the condition is not met - to be used for internal errors.
* require(bool condition): throws if the condition is not met - to be used for errors in inputs or external components.
* revert(): abort execution and revert state changes


### Mathematical and Cryptographic Functions
* addmod(uint x, uint y, uint k) returns (uint):
* mulmod(uint x, uint y, uint k) returns (uint):
* keccak256(...) returns (bytes32):
* sha256(...) returns (bytes32):
* sha3(...) returns (bytes32):
* ripemd160(...) returns (bytes20):
* ecrecover(bytes32 hash, uint8 v, bytes32 r, bytes32 s) returns (address):


### Adddress Related
* `<address>.balance (uint256)`:
* `<address>.transfer(uint256 amount)`:
* `<address>.send(uint256 amount) returns (bool)`:
* `<address>.call(...) returns (bool)`:
* `<address>.callcode(...) returns (bool)`:
* `<address>.delegatecall(...) returns (bool)`:

### Contract Related
* `this`
* `selfdestruct(address recipient)`
* `suicide(address recipient)`


Doxity: Documentation Generator for Solidity.

All identifiers (contract names, function names and variable names) are restricted to the ASCII character set. It is possible to store UTF-8 encoded data in string variables.

* public: The keyword public automatically generates a function that allows you to access the current value of the state variable from outside of the contract. Without this keyword, other contracts have no way to access the variable.
* address: 160 bit value
* mapping: Mappings can be seen as hash tables which are virtually initialized such that every possible key exists and is mapped to a value whose byte-representation is all zeros. 
* `progma once`
* Coin.balances.call(arg)

## How to develop and debug?


## EVM
* 256bit register stack 
* e-WASM
* send()
* transfer()
* call.value()
* 

## ERC20

```sol
pragma solidity ^0.4.23;


// https://github.com/ethereum/EIPs/issues/20
interface ERC20 {
    function totalSupply() external view returns (uint supply);
    function balanceOf(address _owner) external view returns (uint balance);
    function transfer(address _to, uint _value) external returns (bool success);
    function transferFrom(address _from, address _to, uint _value) external returns (bool success);
    function approve(address _spender, uint _value) external returns (bool success);
    function allowance(address _owner, address _spender) external view returns (uint remaining);
    function decimals() external view returns(uint digits);
    event Approval(address indexed _owner, address indexed _spender, uint _value);
}
```

```java
import java.util.HashMap;
import java.util.Map;

public class ERC20Coin {

    static class Address {
        private String val;
        private static final String PATTERN_ERC20_HASH = "0x[0-9A-Fa-f]{64}";

        public Address(String val) {
            assert (val.matches(PATTERN_ERC20_HASH));
            this.val = val;
        }

        public String toString() {
            return this.val;
        }

        @Override
        public boolean equals(Object obj) {
            return (obj instanceof Address)
                    && ((Address) obj).val.equals(this.val);
        }
    }

    static class TransferEvent{
        public TransferEvent(Address _from, Address _to, Integer _value){

        }
    }

    Address sender;


    String name;
    String symbol;
    long totalSupply;
    Integer demicals;

    Map<Address, Integer> balances;
    Map<Address, Map<Address, Integer>> allowances;


    public ERC20Coin(String name, String symbol, long totalSupply, Integer demicals){
        balances = new HashMap<>();
        allowances = new HashMap<>();
        this.name = name;
        this.symbol = symbol;
        this.totalSupply = totalSupply;
        this.demicals = demicals;
    }

    public Integer balanceOf(Address address) {
        return balances.get(address);
    }

    public void transfer(Address from, Address to, Integer val) {
        Integer balanceFrom = balances.getOrDefault(from, 0);
        Integer balanceTo = balances.getOrDefault(to, 0);

        Map<Address, Integer> allowance;
        if(!allowances.containsKey(from)){
            allowance = new HashMap<Address, Integer>();
        }else{
            allowance = allowances.get(from);
        }
        Integer allowed = allowance.get(sender);
        assert  (allowance.get(sender) >= val) &&
                (balanceFrom >= val);

        if(allowed < Integer.MAX_VALUE){
            allowance.put(sender, allowed - val);
            allowances.put(from, allowance);
        }

        balances.put(from, balanceFrom - val);
        balances.put(to, balanceTo + val);
    }

    public void approve(Address from, Address to, Integer val){
        Map<Address, Integer> allowance;
        if(!allowances.containsKey(from)){
            allowance = new HashMap<Address, Integer>();
        }else{
            allowance = allowances.get(from);
        }

        allowance.put(to, val);
        allowances.put(from, allowance);
    }



}

```



## Airdrop 空投
参考: https://medium.com/bitfwd/how-to-airdrop-your-first-token-3ba187ff7cbf

### 空投地址列表
空投之前需要找到你需要空投地址列表。 如何找到这些地址列表呢？
1. 在 Slack 或者 telegram 等群里寻找鱼儿。 
2. 扫描 Ethereum 上 balance >0 的那些有效账号地址

```sh
parity export state --chain=ropsten -no-storage -no-code -min-balance=1000 -max-balance=500000 -at=2000000 balances.json
```

### 节省 gas 费用
如何一次向多个账号send token?


