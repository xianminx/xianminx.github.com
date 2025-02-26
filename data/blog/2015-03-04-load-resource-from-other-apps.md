---
layout: "post"
title: 'Loading resources from other Android applications.'
published: "true"
tags: [android, classloader]
date: "2015-03-04"
---

This post tells you how to "steal" data and code from other Android applications at Runtime.

At the core of the trick is the method called "Context.createPackageContext". Use this method to create a context for the applications you want to retrieve data from.

After building up a Context for the other application, get the "Resources" object by "context.getResources", then with the new Resources object, you can do whatever you want. Check the following example:

This example shows how to retrieve all string values from the famous app "WeChat".

```java
private void testCreatePackageContext() {
    try {
        String packageName = "com.tencent.mm";
        Context c = createPackageContext(packageName,
                Context.CONTEXT_INCLUDE_CODE | Context.CONTEXT_IGNORE_SECURITY);
        Resources otherR = c.getResources();

        Log.i(TAG, "classloader=" + this.getClassLoader());

        Log.i(TAG, "classloader=" + c.getClassLoader());

        Class RClass = Class.forName(packageName + ".a", true, c.getClassLoader());
        Class[] RTypes = RClass.getDeclaredClasses();
        for (Class RType : RTypes) {
            Field[] fields = RType.getDeclaredFields();
            for (Field f : fields) {
                try {
                    int id = f.getInt(null);
                    String formatStr = String.format("%s, %s=0x%x", otherR.getResourceName(id), f, id);
                    if ("string".equalsIgnoreCase(otherR.getResourceTypeName(id))) {
                        formatStr = String.format("%s, %s=0x%x, value=%s", otherR.getResourceName(id), f, id, otherR.getString(id));
                        Log.i(TAG, formatStr);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
    } catch (PackageManager.NameNotFoundException e) {
        e.printStackTrace();
    } catch (Exception e) {
        e.printStackTrace();
    }
}
```

## ClassLoader

```
18906   android.lucas.swip..  I  classloader=dalvik.system.PathClassLoader[DexPathList[[zip file "/data/app/android.lucas.swipeback.demo-2/base.apk"],nativeLibraryDirectories=[/vendor/lib, /system/lib]]]
18906   android.lucas.swip..  I  classloader=dalvik.system.PathClassLoader[DexPathList[[zip file "/system/framework/com.google.android.maps.jar", zip file "/data/app/com.facebook.katana-1/base.apk"],nativeLibraryDirectories=[/data/app/com.facebook.katana-1/lib/arm, /vendor/lib, /system/lib]]]
```

As the above log shows, 2 classloaders were built, one for the current application, and the other for "WeChat" application.

## String Resources

The following log prints out all string resources contained in "WeChat" package. Similarly, you can list all other major types of resources, such as layouts, drawables, raw assets, etc.

```
28058   android.lucas.swip..  I  com.tencent.mm:string/cje, public static final int com.tencent.mm.a$m.dtP=0x7f091187, value=Reminder: You can only link your own bank cards.
28058   android.lucas.swip..  I  com.tencent.mm:string/ci0, public static final int com.tencent.mm.a$m.dtQ=0x7f091153, value=Last 4 digits
28058   android.lucas.swip..  I  com.tencent.mm:string/cjd, public static final int com.tencent.mm.a$m.dtR=0x7f091186, value=Your information will be encrypted
28058   android.lucas.swip..  I  com.tencent.mm:string/ciz, public static final int com.tencent.mm.a$m.dtS=0x7f091177, value=Add Now
28058   android.lucas.swip..  I  com.tencent.mm:string/cjt, public static final int com.tencent.mm.a$m.dtT=0x7f091196, value=You've already linked this card on WeChat Payment
28058   android.lucas.swip..  I  com.tencent.mm:string/ciy, public static final int com.tencent.mm.a$m.dtU=0x7f091176, value=Open Now
28058   android.lucas.swip..  I  com.tencent.mm:string/ci3, public static final int com.tencent.mm.a$m.dtV=0x7f091156, value=Registered with bank
28058   android.lucas.swip..  I  com.tencent.mm:string/cjg, public static final int com.tencent.mm.a$m.dtW=0x7f091189, value=Cardholder Description
28058   android.lucas.swip..  I  com.tencent.mm:string/cht, public static final int com.tencent.mm.a$m.dtX=0x7f09114c, value=Enter bank card number
28058   android.lucas.swip..  I  com.tencent.mm:string/cjk, public static final int com.tencent.mm.a$m.dtY=0x7f09118d, value=Phone Number
28058   android.lucas.swip..  I  com.tencent.mm:string/cjo, public static final int com.tencent.mm.a$m.dtZ=0x7f091191, value=Pay via both payment password and SMS verification
28058   android.lucas.swip..  I  com.tencent.mm:string/crn, public static final int com.tencent.mm.a$m.dta=0x7f0912b7, value=Details
28058   android.lucas.swip..  I  com.tencent.mm:string/cro, public static final int com.tencent.mm.a$m.dtb=0x7f0912b8, value=Top-up successful
28058   android.lucas.swip..  I  com.tencent.mm:string/crm, public static final int com.tencent.mm.a$m.dtc=0x7f0912b6, value=Details
28058   android.lucas.swip..  I  com.tencent.mm:string/cra, public static final int com.tencent.mm.a$m.dtd=0x7f0912aa, value=Amount (%s)
28058   android.lucas.swip..  I  com.tencent.mm:string/crc, public static final int com.tencent.mm.a$m.dte=0x7f0912ac, value=Input a correct amount
28058   android.lucas.swip..  I  com.tencent.mm:string/cr_, public static final int com.tencent.mm.a$m.dtf=0x7f0912a9, value=Balance Top-up
28058   android.lucas.swip..  I  com.tencent.mm:string/crv, public static final int com.tencent.mm.a$m.dtg=0x7f0912bf, value=Select a bank card
28058   android.lucas.swip..  I  com.tencent.mm:string/cmm, public static final int com.tencent.mm.a$m.dth=0x7f0911fe, value=The bank's system is currently undergoing maintena
```