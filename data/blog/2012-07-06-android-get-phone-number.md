---
layout: "post"
title: 'Android 手机API获取手机号码'
tags: [android]
date: "2012-07-06"
---

之前在网上经常听到开发者传言Android平台中可以通过API接口获取SIM卡的ISDN(MSISDN)号码，即大众所受的手机号码。实际上在Android系统设置里面用户去查看这一项的时候是空白。 说明两个问题：

- OS提供API获取这个号码

- OSAPI无法从SIM卡中获取到这个号码

也就是说， 这个API的获取结果和SIM卡相关， 即和运营商相关。

如果使用API可以获取这个号码的话， 对用户隐私将是一个非常大的威胁。

我用下面的代码在移动的动感地带和联通SIM卡上都没有得到手机号码。 松一口气。

> 说明暂时在中国移动和中国联通SIM卡上是无法获取这个号码的。

```java
import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.telephony.TelephonyManager;
import android.util.Log;

public class AndroidNumberActivity extends Activity {
    private static final String TAG = "AndroidNumberActivity";

    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);

        // 创建电话管理
        TelephonyManager tm = (TelephonyManager)
        // 与手机建立连接
        getSystemService(Context.TELEPHONY_SERVICE);
        // 获取手机号码
        String phoneNo = tm.getLine1Number();
        Log.d(TAG, "phnone NO: " + phoneNo);
    }
}
```

注意， 要在 `AndroidManifest.xml` 中添加权限 `android.permission.READ_PHONE_STATE` . 如下：

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.number"
    android:versionCode="1"
    android:versionName="1.0">

    <uses-sdk android:minSdkVersion="4" android:targetSdkVersion="15"/>

    <uses-permission android:name="android.permission.READ_PHONE_STATE" />

    <application
        android:icon="@drawable/ic_launcher"
        android:label="@string/app_name">
        <activity
            android:name=".AndroidNumberActivity"
            android:label="@string/app_name">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
```