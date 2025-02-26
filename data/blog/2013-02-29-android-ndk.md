---
layout: "post"
title: 'Android NDK'
tags: [android]
---

# Android NDK Development

NDK is short for Native Development Kit. It does not benefit for all tasks. Typical good candidates for the NDK are self-contained, CPU-intensive operations that don't allocate much memory, such as signal processing, physics simulation, and so on.

Add `/Users/lucas/dev/android/android-ndk-r8d` to `~/.bash_profile`

```bash
export PATH=${PATH}:/Users/lucas/dev/android/android-ndk-r8d/
```

Here's the general outline of how you work with the NDK tools:

1. Place your native sources under `<project>/jni/...`
2. Create `<project>/jni/Android.mk` to describe your native sources to the NDK build system
3. Optional: Create `<project>/jni/Application.mk`.
4. Build your native code by running the `ndk-build` script from your project's directory. It is located in the top-level NDK directory:
   ```bash
   cd <project>
   <ndk>/ndk-build
   ```
5. The build tools copy the stripped, shared libraries needed by your application to the proper location in the application's project directory. Finally, compile your application using the SDK tools in the usual way. The SDK build tools will package the shared libraries in the application's deployable `.apk` file.

### On ARM emulator

```bash
root@android:/data/data/com.example.hellojni/lib # ls
gdbserver
libhello-jni.so
root@android:/data/data/com.example.hellojni/lib #
```

Running JNI app on Intel Emulator.

```bash
# pwd
/data/data/com.example.hellojni/lib
# ls
#
```

```
I/ActivityManager( 1013): START {act=android.intent.action.MAIN cat=[android.intent.category.LAUNCHER] flg=0x10200000 cmp=com.example.hellojni/.HelloJni u=0} from pid 1151
D/dalvikvm( 1013): GC_FOR_ALLOC freed 376K, 9% free 12167K/13255K, paused 6ms, total 8ms
D/dalvikvm( 1800): Not late-enabling CheckJNI (already on)
I/dalvikvm( 1800): Turning on JNI app bug workarounds for target SDK version 3...
I/ActivityManager( 1013): Start proc com.example.hellojni for activity com.example.hellojni/.HelloJni: pid=1800 uid=10071 gids={1015, 1028}
E/Trace   ( 1800): error opening trace file: No such file or directory (2)
W/dalvikvm( 1800): Exception Ljava/lang/UnsatisfiedLinkError; thrown while initializing Lcom/example/hellojni/HelloJni;
W/dalvikvm( 1800): Class init failed in newInstance call (Lcom/example/hellojni/HelloJni;)
D/AndroidRuntime( 1800): Shutting down VM
W/dalvikvm( 1800): threadid=1: thread exiting with uncaught exception (group=0xb3fb7288)
E/AndroidRuntime( 1800): FATAL EXCEPTION: main
E/AndroidRuntime( 1800): java.lang.ExceptionInInitializerError
E/AndroidRuntime( 1800):  at java.lang.Class.newInstanceImpl(Native Method)
E/AndroidRuntime( 1800):  at java.lang.Class.newInstance(Class.java:1319)
E/AndroidRuntime( 1800):  at android.app.Instrumentation.newActivity(Instrumentation.java:1053)
E/AndroidRuntime( 1800):  at android.app.ActivityThread.performLaunchActivity(ActivityThread.java:1974)
E/AndroidRuntime( 1800):  at android.app.ActivityThread.handleLaunchActivity(ActivityThread.java:2084)
E/AndroidRuntime( 1800):  at android.app.ActivityThread.access$600(ActivityThread.java:130)
E/AndroidRuntime( 1800):  at android.app.ActivityThread$H.handleMessage(ActivityThread.java:1195)
E/AndroidRuntime( 1800):  at android.os.Handler.dispatchMessage(Handler.java:99)
E/AndroidRuntime( 1800):  at android.os.Looper.loop(Looper.java:137)
E/AndroidRuntime( 1800):  at android.app.ActivityThread.main(ActivityThread.java:4745)
E/AndroidRuntime( 1800):  at java.lang.reflect.Method.invokeNative(Native Method)
E/AndroidRuntime( 1800):  at java.lang.reflect.Method.invoke(Method.java:511)
E/AndroidRuntime( 1800):  at com.android.internal.os.ZygoteInit$MethodAndArgsCaller.run(ZygoteInit.java:786)
E/AndroidRuntime( 1800):  at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:553)
E/AndroidRuntime( 1800):  at dalvik.system.NativeStart.main(Native Method)
E/AndroidRuntime( 1800): Caused by: java.lang.UnsatisfiedLinkError: Couldn't load hello-jni: findLibrary returned null
E/AndroidRuntime( 1800):  at java.lang.Runtime.loadLibrary(Runtime.java:365)
E/AndroidRuntime( 1800):  at java.lang.System.loadLibrary(System.java:535)
E/AndroidRuntime( 1800):  at com.example.hellojni.HelloJni.<clinit>(HelloJni.java:64)
E/AndroidRuntime( 1800):  ... 15 more
W/ActivityManager( 1013):   Force finishing activity com.example.hellojni/.HelloJni
D/dalvikvm( 1013): GC_FOR_ALLOC freed 43K, 7% free 12376K/13255K, paused 7ms, total 7ms
W/ActivityManager( 1013): Activity pause timeout for ActivityRecord{b4919ef8 com.example.hellojni/.HelloJni}
I/ActivityManager( 1013): No longer want com.android.email (pid 1375): hidden #16
I/Process ( 1800): Sending signal. PID: 1800 SIG: 9
I/ActivityManager( 1013): Process com.example.hellojni (pid 1800) has died.
W/InputMethodManagerService( 1013): Window already focused, ignoring focus gain of: com.android.internal.view.IInputMethodClient$Stub$Proxy@b49f4280 attribute=android.view.inputmethod.EditorInfo@b4b3d0f0
W/ActivityManager( 1013): Activity destroy timeout for ActivityRecord{b4919ef8 com.example.hellojni/.HelloJni}
```

## Sample "NativeActivity"

### On ARM emulator

```bash
W/dalvikvm(  956): threadid=1: thread exiting with uncaught exception (group=0x40a70930)
E/AndroidRuntime(  956): FATAL EXCEPTION: main
E/AndroidRuntime(  956): java.lang.RuntimeException: Unable to start activity ComponentInfo{com.example.native_activity/android.app.NativeActivity}: java.lang.IllegalArgumentException: Unable to find native library: native-activity
E/AndroidRuntime(  956):  at android.app.ActivityThread.performLaunchActivity(ActivityThread.java:2180)
E/AndroidRuntime(  956):  at android.app.ActivityThread.handleLaunchActivity(ActivityThread.java:2230)
E/AndroidRuntime(  956):  at android.app.ActivityThread.access$600(ActivityThread.java:141)
E/AndroidRuntime(  956):  at android.app.ActivityThread$H.handleMessage(ActivityThread.java:1234)
E/AndroidRuntime(  956):  at android.os.Handler.dispatchMessage(Handler.java:99)
E/AndroidRuntime(  956):  at android.os.Looper.loop(Looper.java:137)
E/AndroidRuntime(  956):  at android.app.ActivityThread.main(ActivityThread.java:5039)
E/AndroidRuntime(  956):  at java.lang.reflect.Method.invokeNative(Native Method)
E/AndroidRuntime(  956):  at java.lang.reflect.Method.invoke(Method.java:511)
E/AndroidRuntime(  956):  at com.android.internal.os.ZygoteInit$MethodAndArgsCaller.run(ZygoteInit.java:793)
E/AndroidRuntime(  956):  at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:560)
E/AndroidRuntime(  956):  Caused by: java.lang.IllegalArgumentException: Unable to find native library: native-activity
E/AndroidRuntime(  956):  at android.app.NativeActivity.onCreate(NativeActivity.java:181)
E/AndroidRuntime(  956):  at android.app.Activity.performCreate(Activity.java:5104)
E/AndroidRuntime(  956):  at android.app.Instrumentation.callActivityOnCreate(Instrumentation.java:1080)
E/AndroidRuntime(  956):  at android.app.ActivityThread.performLaunchActivity(ActivityThread.java:2144)
E/AndroidRuntime(  956):  ... 11 more
W/ActivityManager(  285):   Force finishing activity com.example.native_activity/android.app.NativeActivity
W/Trace   (  402): Unexpected value from nativeGetEnabledTags: 0
D/dalvikvm(  285): GC_FOR_ALLOC freed 467K, 21% free 11175K/14060K, paused 89ms, total 90ms
```

<p class="heading">
  <a href="http://app.wisemapping.com/c/maps/103695/public">Mind Map</a>
</p>
<div class="content">
  <iframe style={{ width: '700px', height: '400px', border: '1px solid black' }} src="http://app.wisemapping.com/c/maps/103695/embed?zoom=1"></iframe>
</div>