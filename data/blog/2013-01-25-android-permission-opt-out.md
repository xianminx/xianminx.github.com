---
layout: "post"
title: 'Opt out Android Permission'
tags: [android, security, privacy]
date: "2013-01-25"
---

How to selectively accept permission list required by the application for user?

1. Android Security architecture overview.
2. Pros and cons analysis.

On Google groups for Android AOSP, there is an issue requesting for the feature. The major concern from Android Product team is the complexity of writing applications. Bullshit.

Reference:

1. [Issue 3778: Feature request: Application permissions should be individually grantable by the user](http://code.google.com/p/android/issues/detail?id=3778)

## Code Analysis

/dev/android/source/frameworks base/core/java/android/app/ApplicationPackageManager.java

```java
@Override
public int[] getPackageGids(String packageName)
        throws NameNotFoundException {
    try {
        int[] gids = mPM.getPackageGids(packageName);
        if (gids == null || gids.length > 0) {
            return gids;
        }
    } catch (RemoteException e) {
        throw new RuntimeException("Package manager has died", e);
    }

    throw new NameNotFoundException(packageName);
}
```

```java
ApplicationPackageManager(ContextImpl context,
                          IPackageManager pm) {
    mContext = context;
    mPM = pm;
}
```

source/frameworks/base/core/java/android/app/ContextImpl.java

```java
@Override
public PackageManager getPackageManager() {
    if (mPackageManager != null) {
        return mPackageManager;
    }

    IPackageManager pm = ActivityThread.getPackageManager();
    if (pm != null) {
        // Doesn't matter if we make more than one instance.
        return (mPackageManager = new ApplicationPackageManager(this, pm));
    }

    return null;
}
```

services/java/com/android/server/pm/PackageManagerService.java

```java
public int[] getPackageGids(String packageName) {
    final boolean enforcedDefault = isPermissionEnforcedDefault(READ_EXTERNAL_STORAGE);
    // reader
    synchronized (mPackages) {
        PackageParser.Package p = mPackages.get(packageName);
        if (DEBUG_PACKAGE_INFO)
            Log.v(TAG, "getPackageGids" + packageName + ": " + p);
        if (p != null) {
            final PackageSetting ps = (PackageSetting)p.mExtras;
            final SharedUserSetting suid = ps.sharedUser;
            int[] gids = suid != null ? suid.gids : ps.gids;

            // include GIDs for any unenforced permissions
            if (!isPermissionEnforcedLocked(READ_EXTERNAL_STORAGE, enforcedDefault)) {
                final BasePermission basePerm = mSettings.mPermissions.get(
                        READ_EXTERNAL_STORAGE);
                gids = appendInts(gids, basePerm.gids);
            }

            return gids;
        }
    }
    // stupid thing to indicate an error.
    return new int[0];
}
```

android.content.pm.PackageParser

```html
<a href="http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.2_r1.1/android/content/pm/PackageParser.java#365">365</a>  <b>public</b> <a href="http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.2_r1.1/android/content/pm/PackageParser.java#PackageParser.Package" title="android.content.pm.PackageParser.Package">Package</a> parsePackage(<a href="http://grepcode.com/file/repository.grepcode.com/java/root/jdk/openjdk/6-b14/java/io/File.java#File" title="java.io.File">File</a> sourceFile, <a href="http://grepcode.com/file/repository.grepcode.com/java/root/jdk/openjdk/6-b14/java/lang/String.java#String" title="java.lang.String">String</a> destCodePath,<br/>
<a href="http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.2_r1.1/android/content/pm/PackageParser.java#366">366</a>          <a href="http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.2_r1.1/android/util/DisplayMetrics.java#DisplayMetrics" title="android.util.DisplayMetrics">DisplayMetrics</a> metrics, <b>int</b> flags) {<br/>
<a href="http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.2_r1.1/android/content/pm/PackageParser.java#367">367</a>      <a href="http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.2_r1.1/android/content/pm/PackageParser.java#PackageParser.0mParseError" title="int mParseError" class="hidden">mParseError</a> = <a href="http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.2_r1.1/android/content/pm/PackageManager.java#PackageManager.0INSTALL_SUCCEEDED" title="int INSTALL_SUCCEEDED" class="hidden">PackageManager</a>.<a href="http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.2_r1.1/android/content/pm/PackageManager.java#PackageManager.0INSTALL_SUCCEEDED" title="int INSTALL_SUCCEEDED" class="hidden">INSTALL_SUCCEEDED</a>;<br/>
<a href="http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.2_r1.1/android/content/pm/PackageParser.java#369">369</a>      <a href="http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.2_r1.1/android/content/pm/PackageParser.java#PackageParser.0mArchiveSourcePath" title="String mArchiveSourcePath" class="hidden">mArchiveSourcePath</a> = sourceFile.<a href="http://grepcode.com/file/repository.grepcode.com/java/root/jdk/openjdk/6-b14/java/io/File.java#File.getPath%28%29" title="java.io.File.getPath() : String">getPath</a>();<br/>
<a href="http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.2_r1.1/android/content/pm/PackageParser.java#370">370</a>      <b>if</b> (!sourceFile.<a href="http://grepcode.com/file/repository.grepcode.com/java/root/jdk/openjdk/6-b14/java/io/File.java#File.isFile%28%29" title="java.io.File.isFile() : boolean">isFile</a>()) {<br/>
<a href="http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.2_r1.1/android/content/pm/PackageParser.java#371">371</a>          Log.<a href="http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.2_r1.1/android/util/Log.java#Log.w%28java.lang.String%2Cjava.lang.String%29" title="android.util.Log.w(java.lang.String,java.lang.String) : int">w</a>(<a href="http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.2_r1.1/android/content/pm/PackageParser.java#PackageParser.0TAG" title="String TAG" class="hidden">TAG</a>, "Skipping dir: " + <a href="http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.2_r1.1/android/content/pm/PackageParser.java#PackageParser.0mArchiveSourcePath" title="String mArchiveSourcePath" class="hidden">mArchiveSourcePath</a>);<br/>
<a href="http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.2_r1.1/android/content/pm/PackageParser.java#372">372</a>          <a href="http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.2_r1.1/android/content/pm/PackageParser.java#PackageParser.0mParseError" title="int mParseError" class="hidden">mParseError</a> = <a href="http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.2_r1.1/android/content/pm/PackageManager.java#PackageManager.0INSTALL_PARSE_FAILED_NOT_APK" title="int INSTALL_PARSE_FAILED_NOT_APK" class="hidden">PackageManager</a>.<a href="http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.2_r1.1/android/content/pm/PackageManager.java#PackageManager.0INSTALL_PARSE_FAILED_NOT_APK" title="int INSTALL_PARSE_FAILED_NOT_APK" class="hidden">INSTALL_PARSE_FAILED_NOT_APK</a>;<br/>
<a href="http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.2_r1.1/android/content/pm/PackageParser.java#373">373</a>          <b>return</b> <b>null</b>;<br/>
<a href="http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.2_r1.1/android/content/pm/PackageParser.java#374">374</a>      }<br/>
<a href="http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.2_r1.1/android/content/pm/PackageParser.java#375">375</a>      <b>if</b> (!<a href="http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.2_r1.1/android/content/pm/PackageParser.java#PackageParser.isPackageFilename%28java.lang.String%29" title="android.content.pm.PackageParser.isPackageFilename(java.lang.String) : boolean">isPackageFilename</a>(sourceFile.<a href="http://grepcode.com/file/repository.grepcode.com/java/root/jdk/openjdk/6-b14/java/io/File.java#File.getName%28%29" title="java.io.File.getName() : String">getName</a>())<br/>
<a href="http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.2_r1.1/android/content/pm/PackageParser.java#376">376</a>              &amp;&amp; (flags&amp;<a href="http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.2_r1.1/android/content/pm/PackageParser.java#PackageParser.0PARSE_MUST_BE_APK" title="int PARSE_MUST_BE_APK" class="hidden">PARSE_MUST_BE_APK</a>) != 0) {<br/>
<a href="http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.2_r1.1/android/content/pm/PackageParser.java#377">377</a>          <b>if</b> ((flags&amp;<a href="http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.2_r1.1/android/content/pm/PackageParser.java#PackageParser.0PARSE_IS_SYSTEM" title="int PARSE_IS_SYSTEM" class="hidden">PARSE_IS_SYSTEM</a>) == 0) {<br/>
<a href="http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.2_r1.1/android/content/pm/PackageParser.java#378">378</a>              // We expect to have non-.apk files in the system dir,<br/>
<a href="http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.2_r1.1/android/content/pm/PackageParser.java#379">379</a>              // so don't warn about them.<br/>
<a href="http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.2_r1.1/android/content/pm/PackageParser.java#380">380</a>              Log.<a href="http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.2_r1.1/android/util/Log.java#Log.w%28java.lang.String%2Cjava.lang.String%29" title="android.util.Log.w(java.lang.String,java.lang.String) : int">w</a>(<a href="http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.2_r1.1/android/content/pm/PackageParser.java#PackageParser.0TAG" title="String TAG" class="hidden">TAG</a>, "Skipping non-package file: " + <a href="http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.2_r1.1/android/content/pm/PackageParser.java#PackageParser.0mArchiveSourcePath" title="String mArchiveSourcePath" class="hidden">mArchiveSourcePath</a>);<br/>
<a href="http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.2_r1.1/android/content/pm/PackageParser.java#382">382</a>          <a href="http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.2_r1.1/android/content/pm/PackageParser.java#PackageParser.0mParseError" title="int mParseError" class="hidden">mParseError</a> = <a href="http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.2_r1.1/android/content/pm/PackageManager.java#PackageManager.0INSTALL_PARSE_FAILED_NOT_APK" title="int INSTALL_PARSE_FAILED_NOT_APK" class="hidden">PackageManager</a>.<a href="http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.2_r1.1/android/content/pm/PackageManager.java#PackageManager.0INSTALL_PARSE_FAILED_NOT_APK" title="int INSTALL_PARSE_FAILED_NOT_APK" class="hidden">INSTALL_PARSE_FAILED_NOT_APK</a>;<br/>
<a href="http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.2_r1.1/android/content/pm/PackageParser.java#383">383</a>          <b>return</b> <b>null</b>;<br/>
<a href="http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.2_r1.1/android/content/pm/PackageParser.java#384">384</a>      }<br/>