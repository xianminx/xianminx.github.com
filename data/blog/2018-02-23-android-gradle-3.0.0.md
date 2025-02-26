---
layout: "post"
title: 'Upgrade to Android Studio 3.0'
published: "true"
tags: [android]
date: "2018-02-23"
---

After upgrading to Android Studio 3.0, many configs changed.  
Please check [https://developer.android.com/studio/build/gradle-plugin-3-0-0-migration.html](https://developer.android.com/studio/build/gradle-plugin-3-0-0-migration.html) for details.

# Versions

Android Studio as an IDE often breaks because of the incompatibility of these three components:

- Android Studio
- Gradle
- Android Plugin for Gradle

Make sure they are compatible.

In latest version as 2018/02/23,

- Android Studio v3.0.1
- Gradle v4.1
- Android Plugin for Gradle v3.0.1

The version for `Android Studio` and `Android Plugin for Gradle` should be always the same.

# Naming

com.android.feature

![](https://i.stack.imgur.com/DDRqz.png)

implementation, api, compileOnly, and runtimeOnly.

flavor dimensions