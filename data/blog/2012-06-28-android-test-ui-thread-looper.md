---
layout: post
title: 'Android Test For UI Thread Listeners'
tags: [android]
---

The other day I wrote an Android downloading service running in a separate process. The main application process will send command/message to the downloading process asking it to download item. The downloading process is supposed to post back the downloading process and status to the main applicaiton process by sending messages. Everything works fine: the application process can send command and downloading process can receive the command and then start downloading the item. Also the application process can also receives the process update messages from the donwloading process.

For the sake of recursive testing, namely, I wrote the following test case, following the direction specified by [Android SDK documentation](http://developer.android.com/tools/testing/testing_android.html).
Then run in Eclipse, everything worked fine, and I didnot put much effort on it, it got into the source depot.

```java

public class DownloadAgentTest extends
		ActivityInstrumentationTestCase2<UtActivity> {
	private static final String LOG_TAG = DownloadAgentTest.class.getName();
	public DownloadAgentTest() {
		super("com.example", com.ut.UtActivity.class);
	}

	@Override
	protected void setUp() throws Exception {
		super.setUp();
		mActivity = getActivity();
		mContext = mActivity.getBaseContext();
	}

	private UtActivity mActivity;
	private Context mContext;

	@Test
	public void testDownloadAgent() {
		final CountDownLatch signal = new CountDownLatch(1);

		IDownloadListener listener = new IDownloadListener() {
			@Override
			public void onStart() {
				Log.d(LOG_TAG, "onStart");
			}

			@Override
			public void onProgressUpdate(int progress) {
				Log.d(LOG_TAG, "onProgressUpdate("+progress +")");
			}

			@Override
			public void onEnd(int result, String file) {
				Log.d(LOG_TAG, "onEnd("+result +", "+ file +")");
				Assert.assertTrue(result ==1);
				Assert.assertTrue(file.contains("/sdcard/"));
				signal.countDown();
			}

		};
		DownloadAgent agent = new DownloadAgent(
				mContext,
				"xp",
				"App_name",
				"http://www.google.com/some.apk",
				listener);
		agent.start();
		try {
			signal.await(100, TimeUnit.SECONDS);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

}

```

Days later, one of my collegues read that code, run it, but asked: "How do you know functions `onProgressUpdate` and `onEnd` are called?". Inspired by his question, I updated the code as：

```java

public class DownloadAgentTest extends
		ActivityInstrumentationTestCase2<UtActivity> {
	private static final String LOG_TAG = DownloadAgentTest.class.getName();

	boolean onStartTriggered = false;
	boolean onProgressUpdateTriggered = false;
	boolean onEndTriggered = false;

	public DownloadAgentTest() {
		super("com.example", com.ut.UtActivity.class);
	}

	@Override
	protected void setUp() throws Exception {
		super.setUp();
		mActivity = getActivity();
		mContext = mActivity.getBaseContext();
	}

	private UtActivity mActivity;
	private Context mContext;

	@Test
	public void testDownloadAgent() {
		final CountDownLatch signal = new CountDownLatch(1);

		onStartTriggered = false;
		onProgressUpdateTriggered = false;
		onEndTriggered = false;

		IDownloadListener listener = new IDownloadListener() {
	        			@Override
	        			public void onStart() {
	        				Log.d(LOG_TAG, "onStart");
	        				onStartTriggered = true;
	        			}

	        			@Override
	        			public void onProgressUpdate(int progress) {
	        				Log.d(LOG_TAG, "onProgressUpdate("+progress +")");
	        				onProgressUpdateTriggered =true;
	        			}

	        			@Override
	        			public void onEnd(int result, String file) {
	        				onEndTriggered =true;
	        				Log.d(LOG_TAG, "onEnd("+result +", "+ file +")");
	        				Assert.assertTrue(result ==1);
	        				Assert.assertTrue(file.contains("/sdcard/"));
	        				signal.countDown();
	        			}
	        };

		DownloadAgent agent = new DownloadAgent(
				mContext,
				"xp",
				"App_name",
				"http://www.google.com/some.apk",
				listener);
		agent.start();
		try {
			signal.await(100, TimeUnit.SECONDS);
			Assert.assertTrue(onStartTriggered);
			Assert.assertTrue(onProgressUpdateTriggered);
			Assert.assertTrue(onEndTriggered);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

}

```

Here I add 3 class variables `onStartTriggered`, `onProgressUpdateTriggered`, `onEndTriggered` to track whether each method is successfully called. And in `try catch` block, use `Assert.assertTrue` to make sure these variables were accessed by correspondent methods after `signal.await` call. But unfortunately, this time I am not lucky enough. The test case failed.
After digging into the code, I found these 3 methods were not called at all. That was tricky, they can be successfuly called in the applicaiton code, but not in the test!
With a few Google search, I found this diagram on StackOverflow. Thread:[ Intent resolved to different process when running Unit Test in Android](http://stackoverflow.com/questions/6445247/intent-resolved-to-different-process-when-running-unit-test-in-android)

![Instrumentation runs all of your application components in the same process.](http://i.stack.imgur.com/5cjBh.png)

The diagram explained the phenomenon to some extent.
The test runner is running in a sparate thread than the UI thread. What this hint is that the test runner thread has no looper, which is required for Android message communication mechanism. See [andorid.os.Looper](http://developer.android.com/reference/android/os/Looper.html).

As it infers, the runner thread has no looper, thus `IDownloadListener listener`, which was implemented using the `Messager` in android to receive messages from downloading process, cannot receives message. As a result, in the test code, the above 3 methods were not called.

But then how can we test that code? The solution is simple, move the listener code to UI thread. In fact, Android Test framework does support this. [Testing on the UI thread](http://developer.android.com/tools/testing/activity_testing.html#RunOnUIThread).

As illustrated in the following code snippet:

```java

public class DownloadAgentTest extends
		ActivityInstrumentationTestCase2<UtActivity> {
	private static final String LOG_TAG = DownloadAgentTest.class.getName();

	boolean onStartTriggered = false;
	boolean onProgressUpdateTriggered = false;
	boolean onEndTriggered = false;

	public DownloadAgentTest() {
		super("com.example", com.ut.UtActivity.class);
	}

	@Override
	protected void setUp() throws Exception {
		super.setUp();
		mActivity = getActivity();
		mContext = mActivity.getBaseContext();
	}

	private UtActivity mActivity;
	private Context mContext;

	@Test
	public void testDownloadAgent() {
		final CountDownLatch signal = new CountDownLatch(1);

		onStartTriggered = false;
		onProgressUpdateTriggered = false;
		onEndTriggered = false;

	  	mActivity.runOnUiThread(new Runnable() {
	          public void run() {
	        		IDownloadListener listener = new IDownloadListener() {
	        			@Override
	        			public void onStart() {
	        				Log.d(LOG_TAG, "onStart");
	        				onStartTriggered = true;
	        			}

	        			@Override
	        			public void onProgressUpdate(int progress) {
	        				Log.d(LOG_TAG, "onProgressUpdate("+progress +")");
	        				onProgressUpdateTriggered =true;
	        			}

	        			@Override
	        			public void onEnd(int result, String file) {
	        				onEndTriggered =true;
	        				Log.d(LOG_TAG, "onEnd("+result +", "+ file +")");
	        				Assert.assertTrue(result ==1);
	        				Assert.assertTrue(file.contains("/sdcard/"));
	        				signal.countDown();
	        			}
	        		};

	      		DownloadAgent agent = new DownloadAgent(
	    				mContext,
	    				"xp",
	    				"App_name",
	    				"http://www.google.com/some.apk",
	    				listener);
	        	agent.start();
	          }
	      });

		try {
			signal.await(300, TimeUnit.SECONDS);
			Assert.assertTrue(onStartTriggered);
			Assert.assertTrue(onProgressUpdateTriggered);
			Assert.assertTrue(onEndTriggered);

		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

}

```

This time it works fine.

> Caution:
> Although [Testing on the UI thread](http://developer.android.com/tools/testing/activity_testing.html#RunOnUIThread) tells that you can use both `@UIThreadTest` annotation and `mActivity.runOnUiThread(new Runnable()` to run some code on UI thread, in the case I mentioned above, do not use the first solution.
> Our code use

```java
                        signal.await(300, TimeUnit.SECONDS);
```

to synchronize. So if we put `@UIThreadTest` annotation, `listener` will not be executed, as `await` will block the main UI thread. The `Looper` is blocked, it cannot receive messages!.
