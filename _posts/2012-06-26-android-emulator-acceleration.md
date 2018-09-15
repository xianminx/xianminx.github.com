---
layout: post
title: "Android Account Manager"
tags: [android]
---

Android系统本身提供了多用户账户的支持。 这里的多用户账户不是指操作系统中的用户，而是不同网络服务的账户， 如Google账户， Facebook账户， Twitter账户等。

 对于android操作系统来讲，本身就是Linux系统，是一个支持多用户的系统。 每一个应用对应于一个process，运行时会有一个独立的UID， 也就对应于Linux中的用户。 开发者可以在adb下使用 `ps` 命令来查看。
如下，左边第一列就是运行对应应用的用户名. 可以看到， 对于安装的应用而言，每个应用都有自己独立的UID， 如`com.baidu.input`的UID为`app_67`

```java
root      117   2     0      0     c01839a4 00000000 S ext4-dio-unwrit
system    133   1     17020  4296  c052d258 400307b0 S /system/bin/servicemanager
root      134   1     6040   996   ffffffff ffff0520 S /system/bin/vold
system    138   1     64424  11408 ffffffff 400c17b0 S /system/bin/surfaceflinger
root      139   1     445988 40160 ffffffff 4008d8d4 S zygote
drm       140   1     18912  4340  ffffffff 400507b0 S /system/bin/drmserver
media     141   1     49032  8836  ffffffff 400207b0 S /system/bin/mediaserver
bluetooth 142   1     1368   820   c01fad68 ffff0520 S /system/bin/dbus-daemon
root      143   1     5692   992   ffffffff 400ac578 S /system/bin/installd
keystore  144   1     1764   564   c05797b8 4004f0b8 S /system/bin/keystore
system    146   1     18832  4248  ffffffff 4007b7b0 S /system/bin/fmradioserver
root      147   1     10428  1312  ffffffff 4006f6d4 S /system/bin/thermald
nobody    164   1     7000   340   ffffffff 400be7b0 S /system/bin/rmt_storage
system    165   1     8360   1292  ffffffff 4005f0b8 S /system/bin/time_daemon
root      166   1     4504   216   ffffffff 0000829c S /sbin/adbd
radio     174   1     13668  3444  ffffffff ffff0520 S /system/bin/rild
radio     176   1     10604  652   ffffffff 400ee8d4 S /system/bin/qmuxd
radio     178   1     5688   932   ffffffff 400cb6d4 S /system/bin/netmgrd
root      249   2     0      0     c01839a4 00000000 S rpcrotuer_smd_x
root      250   2     0      0     c0125c10 00000000 S krpcserversd
root      251   2     0      0     c012462c 00000000 D krmt_storagecln
root      252   2     0      0     c01273c0 00000000 D krmt_storagecln
root      266   2     0      0     c0210144 00000000 S flush-179:0
system    305   139   578160 86556 ffffffff 4008d7b0 S system_server
system    427   139   487128 57384 ffffffff 4008e4c4 S com.android.systemui
app_67    496   139   463356 44732 ffffffff 4008e4c4 S com.baidu.input
radio     511   139   511076 68580 ffffffff 4008e4c4 S com.android.phone
app_22    520   139   469480 47564 ffffffff 4008e4c4 S com.lbe.security.miui
app_29    536   139   480532 82768 ffffffff 4008e4c4 S com.miui.home
app_67    568   496   1320   924   c01f1f28 40090594 S logcat
app_47    593   139   453256 32464 ffffffff 4008e4c4 S com.android.smspush
app_0     605   139   508268 62564 ffffffff 4008e4c4 S android.process.acore
app_10    622   139   515376 49132 ffffffff 4008e4c4 S com.google.process.gapps
root      732   1     5252   516   ffffffff 400f56d4 S /system/bin/mpdecision
app_82    1272  1     1156   764   c01fad68 400758d4 S logcat
app_72    1552  139   469184 33464 ffffffff 4008e4c4 S com.oasistudio.tk
app_82    6993  139   473684 37396 ffffffff 4008e4c4 S cn.lookoo.tuangou
app_82    7006  6993  1024   632   c01fad68 400ef8d4 S logcat
root      18719 2     0      0     c0121ccc 00000000 D kworker/u:3
root      19261 2     0      0     c018dd14 00000000 S iscan_sysioc
root      19262 2     0      0     c018dd14 00000000 S dhcp_sysioc
root      19263 2     0      0     c018dd14 00000000 S dhd_watchdog
root      19264 2     0      0     c018dd14 00000000 S dhd_dpc
root      19265 2     0      0     c018dd14 00000000 S dhd_sysioc
log       19266 1     716    292   c03a6b1c 4002b578 S /system/bin/logwrapper
wifi      19268 19266 2468   1252  c01fad68 400f28d4 S /system/bin/wpa_supplicant
app_87    19394 139   461244 38592 ffffffff 4008e4c4 S com.box.brian.activity
root      21861 2     0      0     c0181c44 00000000 S kworker/u:1
app_99    22996 139   494164 35896 ffffffff 4008e4c4 S com.renren.mobile.chat:sixinpush
root      23578 2     0      0     c0210144 00000000 S flush-179:96
app_96    23724 139   454356 33508 ffffffff 4008e4c4 S com.mbook.itaoshu
app_88    23830 139   477360 52496 ffffffff 4008e4c4 S com.wandoujia.phoenix2
dhcp      25092 1     952    468   c01fad68 ffff0520 S /system/bin/dhcpcd
root      25559 1     9648   1412  ffffffff ffff0520 S /system/bin/netd
root      26702 1     728    292   c05797b8 4008c0b8 S /system/bin/debuggerd
app_26    27385 139   470492 40448 ffffffff 4008e4c4 S com.google.android.apps.maps:NetworkLocationService
app_43    28373 139   476148 41240 ffffffff 4008e4c4 S com.android.vending
app_91    28402 139   463464 36712 ffffffff 4008e4c4 S com.renren.mobile.android
app_0     28696 139   456256 33980 ffffffff 4008e4c4 S com.android.contacts
app_18    28726 139   500412 61412 ffffffff 4008e4c4 S com.google.android.gm
app_93    28801 139   453896 31740 ffffffff 4008e4c4 S com.fractalist.MobileAcceleration
app_38    28814 139   454696 32664 ffffffff 4008e4c4 S com.android.quicksearchbox
app_10    28829 139   458112 35592 ffffffff 4008e4c4 S com.google.android.gsf.login
root      28885 2     0      0     c0181c44 00000000 S kworker/0:1
app_49    28886 139   470840 41624 ffffffff 4008e4c4 S com.xiaomi.channel
root      28931 2     0      0     c0181c44 00000000 S kworker/u:0
root      28939 2     0      0     c0181c44 00000000 S kworker/0:0
app_48    28987 139   453272 31420 ffffffff 4008e4c4 S com.qualcomm.wiper
app_60    28999 139   454104 33892 ffffffff 4008e4c4 S com.glorymob.joymax.view
root      29103 2     0      0     c0181c44 00000000 S kworker/u:4
app_30    29142 139   459356 40064 ffffffff 4008e4c4 S com.android.mms
system    29168 139   477500 49812 ffffffff 4008e4c4 S com.android.settings
app_15    29212 139   477548 46216 ffffffff 4008e4c4 S com.android.email
app_16    29232 139   460760 32804 ffffffff 4008e4c4 S com.android.exchange
root      29323 2     0      0     c0181c44 00000000 S kworker/0:2
root      29324 2     0      0     c0181c44 00000000 S kworker/0:3
app_26    29345 139   460068 36716 ffffffff 4008e4c4 S com.google.android.apps.maps
app_14    29386 139   454912 34484 ffffffff 4008e4c4 S android.process.media
root      29439 166   804    432   c01090a8 400d6f94 S /system/bin/sh
root      29444 29439 980    364   00000000 400ed578 R ps
```

由于Android系统是为互联网而设计的，自然需要对各种网络服务有很好的支持。 Android的解决方案是提供[AccountManager](http://developer.android.com/reference/android/accounts/AccountManager.html)来管理不同服务的账户。 [AccountManager](http://developer.android.com/reference/android/accounts/AccountManager.html)是由系统提供的服务([AccountManagerService])， 从而很好的在系统层面解决不同应用共享服务账户的问题。 

比如， 用户注册了Google账户，使用这个账户可以登陆Google+,Google Play, Gmail, 也可以同步联系人甚至手机上的其他设置如WI-FI密码和浏览器书签到Google的服务器上。 由于这些服务是由不同的应用提供的，如果账户由每个应用自己单独处理，将是一件很繁琐的事情。 甚至处理不好， 会带来很大的安全隐患。 现在好了，Android在系统级别提供了账户管理功能， 用户只要去账户管理中心登陆账户， 不同应用就可以想账户管理中心请求账户访问权限，而不需要应用本身去维护和管理这些账户，对应用开发来说既简单又安全了。

## Android Account 管理类库介绍
Android中和账户相关的API都在[android.accounts](http://developer.android.com/reference/android/accounts/package-summary.html)包下。 

重要的接口和类有：

### Interfaces
* `AccountManagerCallback<V>` 包含回调函数。 类似于我们经常写的Listener	 
* `AccountManagerFuture<V>`	异步调用`AccountManager`的结果。
* `OnAccountsUpdateListener` AccountMonitor用到的回调接口。 

### Classes 
* AbstractAccountAuthenticator 如果开发者需要实现自己的认证方式， 可以通过继承这个类来实现 
* Account 表示我们的账户
* AccountAuthenticatorActivity	Base class for implementing an Activity that is used to help implement an AbstractAccountAuthenticator. 
* AccountAuthenticatorResponse	Object used to communicate responses back to the AccountManager  
* AccountManager	账户管理的核心类,是访问账户的入口。 
* AuthenticatorDescription	A Parcelable value type that contains information about an account authenticator. 


## 使用[AccountManager]访问已经支持的账户

Android 系统默认支持Google账户， Microsoft Exchange账户，和普通邮件账户。  

现在，假如你开发了一个应用,会使用到用户的Google账户， 比如， 类似于[SMS Backup](https://play.google.com/store/apps/details?id=com.zegoggles.smssync&hl=en)这种应用， 可以把手机端的短信同步到GMail邮箱当中。 当然你不希望已经在自己手机上登陆过Gmail账户的用户再次在你的应用中输入用户名和密码，用户也很害怕把密码告诉你。这种情况下， 你可以请求用户授予你访问他的账户的权利， 如同下图所示： 
，用户也很害怕把密码告诉你。这种情况下， 你可以请求用户授予你访问他的账户的权利， 如同下图所示： 
![Request Account Access from SMS Backup](/imgs/ae6d0505e0138e239f8e7715fddf57ac.png "Reqeust Account Access Permission")


将如何实现呢？

Google 提供了一个很好的例子， 在Google Task API 下。 [](link)
简单的使用如下： 

        
```java
	mAccountManager = AccountManager.get(this);

    	Account[] accounts = mAccountManager.getAccounts();
    	for(Account account : accounts){
    		Log.i(TAG, String.format("account.name={0}, type={1}, content={2}",account.name, account.type, account.describeContents()));
    	}
```    



## 扩展[AccountManager]支持自定义的账户
既然系统的AccountManager提供了这么多的便利， 你开始考虑把自己的在线服务加到Android系统中去了， 比如你有类似人人或者新浪微博， 想要把账户管理加到系统中去， 该怎么做呢？










