---
layout: post
title: 'How does an Android developer fix a bug?'
tags: [android, debug]
---

Day and day ago, I wrote a `DownloadingService` for Android application. The service is provided in an Android SDK, which ill be utilized by other android apps. Some app developers wrote their code in such as way that when user press BACK button on Android, the app will _kill_ itself in such a way:

```java
@Override
public boolean onKeyDown(int keyCode, KeyEvent event)
{
    if ((keyCode == KeyEvent.KEYCODE_BACK))
    {
       android.os.Process.killProcess(android.os.Process.myPid()) ;
       return true;
    }
    return super.onKeyDown(keyCode, event);
}

```

As an advanced Android developer, you may think how this could be stupid and violate the design principle of Android Framework, i.e., "Activity" should follow it's own [lifecycle](http://developer.android.com/reference/android/app/Activity.html).

But as the old saying said, customer is our God. SDK users, some could be novice android develoeprs, they refuse to change their existing strucutre and insist to kill the process when back button is pressed. As a result, the "DownloadingService" is also killed as it resides in the app's main proces.

Though the phenomenon is expected, the novice developer does not think so. They want the DownloadingService to continue download files from the Internet even though they killed the main app process. To make a concession, I changed the "DownloadingSercie" so it runs in a separate process.
This is fair easy. Developer only has to mark the service as "exported" in "AndroidManifest.xml".

```xml
<service
    android:name="com.example.net.DownloadingService"
    android:exported="true"
    android:process=":DownloadingService" >
</service>
```

> Everything goes well until one day.

One developer reported under the scenario he created, the DownloadingService could not correctly download the file:

1. Start the app, click download
2. Exit the app using "BACK" button, which kills app's main process.
3. Restart the app, click download (the same url as the Step 1). He observes that even though the url is the same as Step 1, there will be another notification bar item.
   The first download task is still excuting (from the notification bar).

This is absolutely unexpected, as I added code for this kind of duplicate check. If the url is in downloaing task list, it will not be downloaded again. DownloadingService generates a file name based on url (MD5 hash of the url) along with the file extension, plus suffix ".tmp", then saves it to SD card. After the file is complete downloaded, the file will be renamed to remove suffix ".tmp". Here the duplicate check code did not work!

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

`mClient` as a `Map` records all downloading url. If a url is in downloading, it can't be downloaded again. So no reason that a duplicate url can be added to `mClients`. It is so strange.

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

The trace tells that in Step 3, `mClients` is empty: no elements is added before. This is so abnormal. What happened?

Obviously the Process is still living there, otherwise, the first task cannot continue executing. Recalling from Android API description, the service runs in the main thread of its process. I doubt if the service was destroyed and re-created. After adding log information in it's `onCreate` and `onDestroy` method, yes! The service was destroyed and re-created again. But the process id and thread id are the same.

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

I was really confused. It seems Step 1 and Step 3 were in the same thread. But if that's the case, why data stored in 'mClients' is losed?
Hinted by the number '1', I guess the thread might be killed and re-created, but the thread number was reused as OS find the number can be re-allocated the second time as it realize that no other thread is using this id.

So to make the intestigation a further step, I added a member

```java
class DownloadingService extends Service{
	// generate an random id each time a class instance is created. In this case, it means a new thread is created.
	int thread_random_id = new Random().nextInt(10000);

	// ....
}
```

A-ha, `thread_random_id` is different for the 2 cases!

`DownloadingService` is killed and re-created!
The first task is still downloading because the task was launched in a different thread other than the Service thread itself.

To resolve the issue, simply make `mClient` `static`.

```java
	private static Map<DownloadAgent.DownloadItem, Messenger> mClients = new HashMap<DownloadAgent.DownloadItem, Messenger>();

```

To be continued: why Service thread is killed and re-created?
