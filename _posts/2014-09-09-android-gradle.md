---
layout: post
title: "Gradle"
published: true
tags: [Android, gradle]
---

目标:
1. 初步了解gradle的DSL 语言，能够看懂， 并简单改写。
1. 了解Android Gradle build 系统
1. 为Feedback Android SDK 书写gradle 打包系统，发布。
1. 生成Eclipse 导入环境。 使得在Eclipse 中可用。

<img src="https://0d9321c1-a-db1c6dfe-s-sites.googlegroups.com/a/android.com/tools/tech-docs/new-build-system/build-workflow/Android%20Build%20Process.png?attachauth=ANoY7cquRb3ywfVMD_ZPVzHioLUTJ8QhE5Yt0EhvVtaVEMZjiVUIlmml33h1XxnnNzUGTcOifXobzgMU5tIZBKsXnGBu6ZnkScrZxjOPSVXRB_8mHzW83p0PRvBjK7YsBpxEfBOut8XGwZQi8JTZI_bnrvYMcs4PP1ri20plPjb3HP1lXC_qbrk8oHiIslKzx59EWnJ7CwWgePa4geJASujZCJ3VYXq9qIcZKY9WAONbzUqG2SsUEzfuTP_VorTQRYmt4DYgrXFDc-z1c3mWcbxKVaR_vANxmw%3D%3D&attredirects=0">

<img src="http://www.gradle.org/docs/current/userguide/img/javaPluginTasks.png" />

# 导读
Gradle 是一个通用的编译构建工具。 Gradle 编译脚本使用Groovy的DSL 语言编写。
其强调`配置` 而不是`编程`。

新的Android 工程使用Gradle 来编译， Android 团队提供了一个官方的Gradle plugin 插件来支持Android 工程使用Gradle 来编译。

Android 新的构建系统使得:
* 重用代码和资源变得更容易(maven, ivy, aar 依赖管理)
* 创建应用的变种更容易(收费，免费，等)
* 配置、扩展、自定义构建过程更容易 (Gradle， 插件结构)
* 和Android Studio IDE 合二为一（新的Android Studio 直接使用Gradle 编译， 使得脚本和IDE 完全使用一套编译系统）


Gradle 特征：
* DSL
* Groovy 构建文件
* Maven / Ivy 的依赖管理
* 灵活。 允许最佳实践，但是又不强制
* plugins
* IDE

# 基础
一个Gradle 项目使用根目录下的`build.gradle` 来描述其构建配置。

* java-only

  ```
  apply plugin: 'java'
  ```
* Android

  ```
  buildscript {
      repositories {
          mavenCentral()
      }

      dependencies {
          classpath 'com.android.tools.build:gradle:0.11.1'
      }
  }

  apply plugin: 'android'

  android {
      compileSdkVersion 19
      buildToolsVersion "19.0.0"
  }
  ```

  * buildscript { ... } 配置了构建过程需要的代码。 需要注意的是此中的`dependencies` 只是指定了构建过程需要的依赖， 而不是项目的依赖。
  * `android` 表明使用android 插件来构建此项目。
  * android{ ... } 配置了Android 构建的所有参数。 是Android DSL 的入口。

# 项目结构
Gradle 利用了习惯而不是配置的原则，尽可能的提供一些合理的默认值。

可以使用"sourceSets" 来配置或者改变默认值

  ```
  sourceSets {
      main {
          java {
              srcDir 'src/java'
          }
          resources {
              srcDir 'src/resources'
          }
      }
  }
  ```


Android：

  ```
  android {
      sourceSets {
          main {
              manifest.srcFile 'AndroidManifest.xml'
              java.srcDirs = ['src']
              resources.srcDirs = ['src']
              aidl.srcDirs = ['src']
              renderscript.srcDirs = ['src']
              res.srcDirs = ['res']
              assets.srcDirs = ['assets']
          }

          androidTest.setRoot('tests')
      }
  }
  ```


# 任务
* assemble
* check
* build
* clean

## Android 任务
* assemble
  * assembleDebug
  * assembleRelease
* check
  * lint
* connectedCheck
  * connectedAndroidTest
  * connectedUiAutomatorTest
* deviceCheck
* build
* clean


### 自定义构建过程
* Manifest 参数
  ```
  android {
      compileSdkVersion 19
      buildToolsVersion "19.0.0"

      defaultConfig {
          versionCode 12
          versionName "2.0"
          minSdkVersion 16
          targetSdkVersion 16
      }
  }
  ```

### 构建类型

`debug`, `release` instances of `BuildType`.

  ```
  android {
      buildTypes {
          debug {
              applicationIdSuffix ".debug"
          }

          jnidebug.initWith(buildTypes.debug)
          jnidebug {
              packageNameSuffix ".jnidebug"
              jnidebugBuild true
          }
      }
  }

  ```

### ProGuard


## 依赖，Android 类库项目， 多项目配置

* `dependencies`
  * local
      * compile files('libs/foo.jar')
  * remote
      * compile 'com.google.guava:guava:11.0.2'
  * multi-project
      * compile project(':libraries:lib1')

      ```
      MyProject/
       + app/
       + libraries/
          + lib1/
          + lib2/
      ```

* java lib project and android lib project
  * apply plugin: 'android-library'
  * generate a `.aar` Android archive output




* Build flaors and types


# Library publication


# Testing


# Lint support

# Build variants
* 同一个应用的不同版本， 专业版(pro) vs. 免费版
* 多APK: 不同CPU， 不同系统版本， 不同屏幕。 multi-apk


## Product flavors

```
Build Type + Product Flavor = Build Variant
```


# 高级自定义
* java
* aapt
* dex



## AAR format

The 'aar' bundle is the binary distribution of an Android Library Project.

The file extension is .aar, and the maven artifact type should be aar as well, but the file itself a simple zip file with the following entries:
/AndroidManifest.xml (mandatory)
/classes.jar (mandatory)
/res/ (mandatory)
/R.txt (mandatory)
/assets/ (optional)
/libs/*.jar (optional)
/jni/<abi>/*.so (optional)
/proguard.txt (optional)
/lint.jar (optional)
These entries are directly at the root of the zip file.

The R.txt file is the output of aapt with --output-text-symbols.

# Java Plugin
  ```
  apply plugin: 'java'
  ```
## Source sets
* main
* test
## Tasks
## Project layout
  ```
  sourceSets {
    main {
        java {
            srcDir 'src/java'
        }
        resources {
            srcDir 'src/resources'
        }
    }
  }
  ```

  <img src="http://www.gradle.org/docs/current/userguide/img/javaPluginTasks.png" />

## Dependency management

<img src="http://www.gradle.org/docs/current/userguide/img/javaPluginConfigurations.png" />

# Eclipse Plugin

* None
* Java
* Groovy
* Scala
* War
* Ear

# References
1. [Gradle Java Plugin](http://www.gradle.org/docs/current/userguide/java_plugin.html)
1. [Gradle Plugin User Guide](http://tools.android.com/tech-docs/new-build-system/user-guide)
1. [Gradle Build Language Reference](http://www.gradle.org/docs/current/dsl/)
