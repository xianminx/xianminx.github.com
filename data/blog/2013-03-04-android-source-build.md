---
layout: "post"
title: 'Build Android Source'
tags: [android]
date: "2013-03-04"
---

# On Mac OSX

## Prerequisite:

To build the latest source in a Mac OS environment, you will need an Intel/x86 machine running MacOS 10.6 (Snow Leopard) or MacOS 10.7 (Lion), along with Xcode 4.2 (Apple's Developer Tools). Although Lion does not come with a JDK, it should install automatically when you attempt to build the source.

## Steps

1. Creating a case-sensitive disk image

   ```bash
   # hdiutil create -type SPARSE -fs 'Case-sensitive Journaled HFS+' -size 40g ~/android.dmg
   ```

2. Add the following to your ~/.bash_profile to mount the image when you execute "mountAndroid":

   ```bash
   # mount the android file image
   function mountAndroid { hdiutil attach ~/android.dmg -mountpoint /Volumes/android; }
   mountAndroid
   ```

3. Setting a file descriptor limit  
   On MacOS the default limit on the number of simultaneous file descriptors open is too low and a highly parallel build process may exceed this limit.  
   To increase the cap, add the following lines to your ~/.bash_profile:

   ```bash
   # set the number of open files to be 1024
   ulimit -S -n 1024
   ```

4. Download the source