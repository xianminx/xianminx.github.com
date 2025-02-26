---
layout: "post"
title: 'Android NFC'
published: "false"
tags: [android]
date: "2014-01-07"
---

Problem:

> Is it possible to copy information from a door lock card to an Android device and emulate that device as a card?

To Investigate:

1. write a survey: Android card emulation for RFID technology

2 kinds of cards:

- ID, taiwan, no encryption

- IC: Mifare classic, plus, encrypted, classic with proprietary encryption algorithms, cracked, plus with AES.

TODO:

- The mechanism for ID card

- The mechanism for IC card

- How to emulate a ID card

- How to emulate a IC card

## Acronyms

NDEF: NFC Data Exchange Format  
MiFare classic (1k, 4k), MiFare Plus(x, s)  
ISO 14443A  
EEPROM memory  
GPB: General Purpose Byte  
MAD: Mifare Application Directory  
PCD: Proximity Coupling Device: contactless device, PICC  
TLV: Type Length Value  
UID: Unique Identifier, or serial number  

Memory layout  
1K = 16 sector _ 4 block/sector _ 16 bytes/block  

数据格式是什么  
传输协议？ 流程  

## ISO/IEC 14443

Parts[edit]

- ISO/IEC 14443-1:2008 Part 1: Physical characteristics[1]
- ISO/IEC 14443-2:2010 Part 2: Radio frequency power and signal interface[2]
- ISO/IEC 14443-3:2011 Part 3: Initialization and anticollision[3]
- ISO/IEC 14443-4:2008 Part 4: Transmission protocol[4]

Reference:

- [Near field communication](http://en.wikipedia.org/wiki/Near_field_communication) from Wikipedia  
- [Professional NFC Application Development for Android](http://www.amazon.com/Professional-NFC-Application-Development-Android/dp/1118380096) by Vedat Coskun, Kerem Ok, Busra Ozdenizci.
- Nokia [Understanding NFC Data Exchange Format (NDEF) messages](http://developer.nokia.com/Community/Wiki/Understanding_NFC_Data_Exchange_Format_(NDEF)_messages)  
- [NFC-WAR](http://radiowar.org/about/nfc-war)
- [MIFARE](http://en.wikipedia.org/wiki/MIFARE)
- [ISO/IEC 14443](http://en.wikipedia.org/wiki/ISO/IEC_14443)
- [AN1304 NFC Type MIFARE Classic Tag Operation](http://www.nxp.com/documents/application_note/AN1304.pdf)
- [Open NFC](http://open-nfc.org/wp/editions/android/)