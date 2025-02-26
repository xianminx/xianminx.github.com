---
layout: post
title: 'Android ADB'
tags: [android]
---

- Official document is at [adb](http://developer.android.com/tools/help/adb.html)

- [ADB (Android Debug Bridge):How it works?](https://events.linuxfoundation.org/images/stories/pdf/lf_abs12_kobayashi.pdf) by Tetsuyuki Kobayashi

# Components

- server (pc)
- client (pc)
- daemon (Android devices or emulators)

# serial number

The output for each instance is formatted like this

```
serialNumber state
```

Here is an example showing the devices command and its output:

```
$ adb devices
List of devices attached
emulator-5554  device
emulator-5556  device
emulator-5558  device
```

<iframe style="width:700px;height:400px;border: 1px
solid black" src="http://app.wisemapping.com/c/maps/153198/embed?zoom=1"> </iframe>
