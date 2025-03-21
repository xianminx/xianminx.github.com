---
layout: "post"
title: 'Android Emulator Internet Access'
tags: [android]
date: "2012-07-31"
---

Ocassionally we find our android emulators cannot connect to the internet. May it be working yesterday but not today. Damn it!

The explanation stated by [this post](http://stackoverflow.com/questions/2437366/android-emulator-internet-access) reveals the underlying cause.

On some WI-FI network, the emulator could not get DNS configuration automatically. My experience shows this not only happens to wifi network, but also to cable network.

### Solution

There are 2 solutions:

1. Manually set DNS,

   - set DNS when emulator starts up.

   ```bash
   In Eclipse:

   Window > Preferences > Android > Launch

   Default emulator options: -dns-server 8.8.8.8,8.8.4.4
   ```

   - set DNS after emulator starts up.

   ```bash
   setprop dns.net1 8.8.8.8
   ```

   The IP `8.8.8.8` and `8.8.4.4` are provided by Google freely.

2. Toggle the Internet access to your emulator with _F8_ (on Windows) and _Fn + F8_ (on Mac OS X).

   With this shortcut, you get the `ACTION_BACKGROUND_DATA_SETTING_CHANGED` dispatched.