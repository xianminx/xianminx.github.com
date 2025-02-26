---
layout: 'post'
title: 'Publish Android Library'
tags: [android, open source, git, github]
date: '2015-03-03'
---

Like you, as an Android developer that has benefitted from Github open source libraries a lot for long time, I start thinking how to repay this community. The best way, of course, is to share my contribution by publishing android library code. This post tells what to follow when you want to publish your Android library project on Github.

### Github & Git

The first of the first, you should take some time to get familiar with Git and Github.

### Gradle & Android Studio

Familiarize yourself with Gradle and Android Studio.

### Choose a License

Choose a license for your project. If you do not know how to, check this page:  
[http://choosealicense.com/](http://choosealicense.com/)

"Apache License 2.0" is common to Android open source libraries on Github.

### Add a readme

Add "readme.md" file to tell people what the project is about and how to use it.

### Publish

When you are done with all the library code and Android Studio / gradle project code stuff, it is time to share it.

Android now jcenter uses by default. It is a good idea to share your library by jcenter too so that other Android developers can use your library by just adding gradle dependency, such as:

```groovy
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    compile 'com.android.support:appcompat-v7:21.0.3'
    compile 'android.lucas:swipeback:0.0.1'
}
```

There is no direct support in Android Studio or gradle now and it is a bit tricky to set up.

The post [TUT] Locally release an Android Library for JCenter or Maven Central inclusion](http://blog.blundell-apps.com/locally-release-an-android-library-for-jcenter-or-maven-central-inclusion/) is a good start to accomplish the task.  
To simplify the life, you can customize your library project build.gradle file based on the following template:

[https://gist.github.com/d860969fdda132b6d892.git](https://gist.github.com/d860969fdda132b6d892.git)

<script src="https://gist.github.com/xianminx/d860969fdda132b6d892.js"></script>

Then publish with command:

```
./gradlew bintrayUpload
```

### Github page

Give it a dedicated website or webpage makes your open source library project look professional.  
Github provides "[Github Pages](https://help.github.com/categories/github-pages-basics/)" feature so that you can create a page for your project very easily.

> Project->Setting -> Options -> Github Pages -> Automatic Page Generator

Then follow the instructions to create a webpage for your project.

### Share it on Twitter, G+, Facebook, etc

Finally, after all these done, share it to all social platforms to let people find it.
