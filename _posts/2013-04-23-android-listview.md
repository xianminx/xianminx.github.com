---
layout: post
title: "Android ListView Advanced"
tags: [android]
---

# Introduction
ListView is one of the most fundamental and important Android UI components. Due to the long rectangle shape of mobile device, ListView is widely used as the first level navigation to the more detailed content. Popular using scenarios include, but not limited to, news reader, reading list, e-commere product list, things to do list, ranking list, etc. If your applicaiton intends to providing updatable contents to users, you cannot avoid using this super powerful widgets.

ListView can be very simple and also extremely complex. There are many traps and tricks for novice developers. In this article, the author will summerize some typical traps developers may occur during their use of ListView and try to provide solutions or suggestions. In more general, the author will summerize typical advanced usages of ListView, such as pull to refresh ListView, HTTP cache, data binding, loader, etc.

## Simple Example
Android [ApiDemos](http://developer.android.com/tools/samples/index.html) Sample provide a bundle of examples for using ListView (under android-sdk-macosx/samples/android-17/ApiDemos/src/com/example/android/apis/view).

The following is a simple example.

* /Users/lucas/dev/eclipse-juno-workspace/AdvancedListView/src/com/example/android/apis/view/advancedlistview/SimpleListViewActivity.java

```java
package com.example.android.apis.view.advancedlistview;

import android.app.Activity;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.ListAdapter;
import android.widget.ListView;

public class SimpleListViewActivity extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_simple_listview);
		ListView lv = (ListView) this.findViewById(R.id.list);

		ListAdapter adapter = new ArrayAdapter<String>(this,
				android.R.layout.simple_list_item_1, COUNTRIES);

		lv.setAdapter(adapter);
	}

	private static String[] COUNTRIES = new String[] { "CHINA", "US", "JAPAN" };
}
```

* /Users/lucas/dev/eclipse-juno-workspace/AdvancedListView/res/layout/activity_simple_listview.xml  

```xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    tools:context=".MainActivity" >

    <ListView
        android:id="@+id/list"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content" />

</RelativeLayout>
```


This is a very simple example of ListView.

<img src="/graphics/device-2013-04-24-184626.png" width="300">






## Adapter Architecture
From the above simple example, we find 3 components for the ListView: the standard MVC pattern. Model, View, and Controller.


### View
ListView is embeded in Activity in layout XML.

### Data
To provide data for each item in the ListView, we need a Adapter. Here we use ListAdapter, constructed from a static `String` array.


### Controller
If you want users to interact with your app, you can add `Listeners` for user actions, for example, click event, touch event.
This can be done by setting `setOnItemClickListener`.


## Framework API

### Official Tutorials
* Official introductory tutorial can be found at this [link](http://developer.android.com/guide/topics/ui/layout/listview.html).
*  [Building Layouts with an Adapter](http://developer.android.com/guide/topics/ui/declaring-layout.html#AdapterViews)

### Non-Official Tutorials


### API Explored


# Performance
## Reusing
ConvertView

## ViewHolader



# Header & Footer



# Load Data Async









# Data Binding
## HTTP + JSON
## Image



# GroupList/ SectionList

# Resources on Github
































1. [Performance Tips for Android’s ListView](http://lucasr.org/2012/04/05/performance-tips-for-androids-listview/)
1. [Google I/O 2010 - The world of ListView]<iframe width="560" height="315" src="//www.youtube.com/embed/wDBM6wVEO70" frameborder="0" allowfullscreen></iframe>





[MIND MAP](http://app.wisemapping.com/c/maps/116744/public)

<iframe style="width:700px;height:800px;border: 1px
solid black" src="http://app.wisemapping.com/c/maps/116744/embed?zoom=1"> </iframe>
