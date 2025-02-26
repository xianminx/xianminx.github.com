---
layout: "post"
title: 'How does an Android developer fix a bug?'
tags: [android, debug]
date: "2012-06-29"
---

Day and day ago, I wrote a `DownloadingService` for Android application. The service is provided in an Android SDK, which will be utilized by other android apps. Some app developers wrote their code in such a way that when the user presses the BACK button on Android, the app will _kill_ itself in such a way:

```java
@Override
public boolean onKeyDown(int keyCode, KeyEvent event)
{
    if ((keyCode == KeyEvent.KEYCODE_BACK))
    {
       android.os.Process.killProcess(android.os.Process.myPid());
       return true;
    }
    return super.onKeyDown(keyCode, event);
}
```

As an advanced Android developer, you may think how this could be stupid and violate the design principle of Android Framework, i.e., "Activity" should follow its own [lifecycle](http://developer.android.com/reference/android/app/Activity.html).

But as the old saying goes, customer is our God. SDK users, some could be novice android developers, refuse to change their existing structure and insist on killing the process when the back button is pressed. As a result, the "DownloadingService" is also killed as it resides in the app's main process.

Though the phenomenon is expected, the novice developer does not think so. They want the DownloadingService to continue downloading files from the Internet even though they killed the main app process. To make a concession, I changed the "DownloadingService" so it runs in a separate process. This is fairly easy. The developer only has to mark the service as "exported" in "AndroidManifest.xml".

```xml
<service
    android:name="com.example.net.DownloadingService"
    android:exported="true"
    android:process=":DownloadingService">
</service>
```

> Everything goes well until one day.

One developer reported that under the scenario he created, the DownloadingService could not correctly download the file:

1. Start the app, click download.
2. Exit the app using the "BACK" button, which kills the app's main process.
3. Restart the app, click download (the same URL as in Step 1). He observes that even though the URL is the same as in Step 1, there will be another notification bar item. The first download task is still executing (from the notification bar).

This is absolutely unexpected, as I added code for this kind of duplicate check. If the URL is in the downloading task list, it will not be downloaded again. DownloadingService generates a file name based on the URL (MD5 hash of the URL) along with the file extension, plus suffix ".tmp", then saves it to the SD card. After the file is completely downloaded, the file will be renamed to remove the suffix ".tmp". Here the duplicate check code did not work!

Here it is:

```java
/**
 * Check if the download request is already processed and is in downloading.
 *
 * @param item
 * @return
 */
private static boolean isInDownloadList(DownloadItem item) {
    if (mClients == null)
        return false;
    for (DownloadItem d : mClients.keySet()) {
        if (d.mUrl.equals(item.mUrl)) {
            return true;
        }
    }
    return false;
}
```

mClients is declared as DownloadingService's class member:

```java
// The clients connected to the service. Messenger references the client,
// where DownloadItem specifies the information required by this service.
private Map<DownloadAgent.DownloadItem, Messenger> mClients = new HashMap<DownloadAgent.DownloadItem, Messenger>();
```

`mClients` as a `Map` records all downloading URLs. If a URL is in downloading, it can't be downloaded again. So there is no reason that a duplicate URL can be added to `mClients`. It is so strange.

Each single line of code looks fine to me.

Then I launch the debug mode, for both the main process and DownloadingService process.

```java
@Override
public void onCreate() {
    super.onCreate();
    Log.d(LOG_TAG, "onCreate ");
    // uncomment the following line to enable inter-process debug.
    android.os.Debug.waitForDebugger();
    // ...
}
```

The trace tells that in Step 3, `mClients` is empty: no elements are added before. This is so abnormal. What happened?

Obviously, the process is still living there; otherwise, the first task cannot continue executing. Recalling from the Android API description, the service runs in the main thread of its process. I doubt if the service was destroyed and re-created. After adding log information in its `onCreate` and `onDestroy` methods, yes! The service was destroyed and re-created again. But the process ID and thread ID are the same.

```java
private static boolean isInDownloadList(DownloadItem item) {
    Log.d(TAG, "pid = " + android.os.Process.myPid());
    Log.d(TAG, "threadid = " + Thread.currentThread().getId());
    if (mClients == null)
        return false;
    for (DownloadItem d : mClients.keySet()) {
        if (d.mUrl.equals(item.mUrl)) {
            return true;
        }
    }
    return false;
}
```

`threadid` shows '1' for both Step 1 and Step 3.

I was really confused. It seems Step 1 and Step 3 were in the same thread. But if that's the case, why is the data stored in 'mClients' lost? Hinted by the number '1', I guess the thread might be killed and re-created, but the thread number was reused as the OS finds the number can be re-allocated the second time as it realizes that no other thread is using this ID.

So to make the investigation a further step, I added a member:

```java
class DownloadingService extends Service {
    // generate a random id each time a class instance is created. In this case, it means a new thread is created.
    int thread_random_id = new Random().nextInt(10000);

    // ....
}
```

A-ha, `thread_random_id` is different for the 2 cases!

`DownloadingService` is killed and re-created! The first task is still downloading because the task was launched in a different thread other than the Service thread itself.

To resolve the issue, simply make `mClients` `static`.

```java
private static Map<DownloadAgent.DownloadItem, Messenger> mClients = new HashMap<DownloadAgent.DownloadItem, Messenger>();
```

To be continued: why is the Service thread killed and re-created?