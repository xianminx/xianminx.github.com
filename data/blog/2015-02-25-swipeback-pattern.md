---
layout: "post"
title: 'Android SwipeBack pattern'
published: "true"
tags: [android]
date: "2015-02-25"
---

### Intro

It has been a widely used pattern by swiping from the left edge of the screen to return to the previous page or screen. iOS Safari presents such a feature. This navigation pattern is natural and convenient, and it would be great to Android developers and users if it can be ported to Android platform. Take a look for the illustration.

<img src="http://media.idownloadblog.com/wp-content/uploads/2013/09/Back-and-forward-iOS-7-safari.gif" width="200" />

The target of this project is to achieve the effect shown by iOS Safari, on Android Activity transition, like native Activity transition animation shown. Fragment transition animation is easy to implement by using ViewPager etc. and thus not discussed here.

### Android implementation

how to: If the user swipes into the screen from the outside of the left edge, the previous page slides in from the left edge while the current page slides out to the right edge of the screen.

It looks like this:
<img src="" width="200" />

#### Illusiveness

To make it more illusive, we can slide the previous page from 75% X-axis, that is, the previous page has already slided in 75% percent when the finder touches the left edge, while the content covered by the current page.

The pace of the previous page is 25% of the current page. So when the current page slides from the left to the right by 100%, the underlying previous page just 25%, which makes it 100% filling the screen perfectly.

This illusiveness is what Safari on iOS does.

To implement the effect on Android, we have to solve the following obstacles:

1. Gesture detection
2. To show part of the Activity / Page on the screen.

To show the animation, we can use the native animation support for the activity but controls it manually.

The most difficult part is to show 2 Activities simultaneously on the screen.

The solutions I found online are all workarounds by using Fragment.

The open source github projects [sockeqwe/SwipeBack](https://github.com/sockeqwe/SwipeBack) and [ikew0ng/SwipeBackLayout](https://github.com/ikew0ng/SwipeBackLayout) replaces the decor view and show the swipe gesture, but cannot show the previous Activity correctly.

### Steps

1. Use GestureDetector to detect the touch event on Activity and set the root decorView of the Activity to the moved position.
2. Override Activity's `onTouchEvent` method.
3. Set the Activity theme to Translucent.

### API Design

Call `android.lucas.swipeback.SwipeBack.enable()`

Creating a new Activity is a bad idea because users may use different types of Activities and this also obeys the rule of "Prefer composition to inheritance".

<img src="http://progx.org/users/Gfx/android/window_background_root.png" width="400" />

SetBackgroundDrawable method takes effect only if the parameter is TRANSPARENT. Setting the drawable to any other drawable does not work.

Add a translucent theme to the activity

```xml
<style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
  <item name="android:windowIsTranslucent">true</item>
  <item name="android:windowBackground">@android:color/transparent</item>
</style>
```

Another Idea: create a layout and insert it into decorview as a child and parent of LinearLayout. Intercept touch event on this layout.

## References

1. [Dragging With ViewDragHelper](http://fedepaol.github.io/blog/2014/09/01/dragging-with-viewdraghelper/)
2. [Each Navigation Drawer Hides a ViewDragHelper](http://flavienlaurent.com/blog/2013/08/28/each-navigation-drawer-hides-a-viewdraghelper/)
3. [sockeqwe/SwipeBack](https://github.com/sockeqwe/SwipeBack)
4. [ikew0ng/SwipeBackLayout](https://github.com/ikew0ng/SwipeBackLayout)
5. [How to Implement a Floating Activity in an Android App](http://cases.azoft.com/android-tutorial-floating-activity/)