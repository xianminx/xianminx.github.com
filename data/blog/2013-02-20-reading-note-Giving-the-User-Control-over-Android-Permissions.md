---
layout: post
title: 'Reading Note: Giving the User Control over Android Permissions'
tags: [android, privacy, security]
---

[paper link](http://css.csail.mit.edu/6.858/2012/projects/helfer-ty12.pdf)

_Abstract_

> In this project, we investigate the possible options for users to restrict application permissions in a more
> ne-grained way and provide a proof of concept for a command-line tool that can remove permissions from
> applications before installation. We tested our tool with Android 2.2 (Froyo) on an emulated NexusS and a
> real Samsung Galaxy S GT-I9000.

# Problem

Android OS provides zero-one solution, but users require more fine grained control over application permission:

1. selectively accept permissions during installation process.
2. revoke permission after application is installed.

# Existing solution

1. no perfect solution
2. Google Play: permission management apps, like privacy blocker, PDroid Privacy Protection, etc.
3. drawback: not very effective, crashes sometime, some blocking apps require root
4. os level trust for blocking applicaiton

# Our solution

modify the app before installation

1. pros: no more trust than the app itself
2. cons:
3. approach: reverse engineering
4. Unzip apk package
5. Remove permissions from AndroidManifest.xml
6. Modify application code to make sure it doesn't crash because of permission issues
7. Zip modied apk package
8. Run on phone
9. fads

#Implementation

1. apktool -> smali, debugging is impractical, no enough material
2. dex2jar -> java, recompiling is difficult.

implement a class which extends the class whose function requires the permission we are removing.

does not work with final classes, such as LocationManager.

replace all API call with a dummy static method call.

# resources

1. stowaway
2. permission map: android-permissions.org, tells which permissions each API call requires.
