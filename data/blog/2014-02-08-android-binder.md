---
layout: post
title: 'Android Binder'
published: false
tags: [android]
---

Binder is the core concept in Android operating system, and is the main difference from Linux.

What's the difference between local service and remote service?
Local Service runs in the same process with calling application .
Remote Service runs in an separate process other than the application process.
Both local and remote services can either startServcie or bindService.
for Remote Service, when binding, there are some difference, you need to retrieve the IBinder interface for IPC.

In what situation should you use one over the other?

What's the behind binder mechanism for service?

What's difference between startService() and bindService()?
startService
bindService , when the caller destroys the service is destoryed.

What is IntentService, any difference to Service? is it remote or local?

what is Messager, how to use it?

- Operating System Ring
- what is system call
- checkout the traditional IPC mechanisms
- What is ashmem used in Android?
- what is Discretionary Access Control DAC on Android, and why does Android use DAC?
- what is kernel driver, why called “driver”?
- Binder Token 类似Windows 中Handle 句柄
- Link to Death
- Binder 如何使用SharedMemory
- 了解Linux 进程间通信的机制， 如何通过Kernel Driver 来实现？
- Uses of Binder on Android: Remote view, Notification, widget, inter-component
-

-

- Binder C Driver - Middleware C++ - Java Wrapper
- what are C lib “open”, mmap, ioctl,release, poll?
-

-

-

Android RemoteViews
探寻Android RemoteViews 实现原理， 如何使用Binder 来实现。

Android 中几种类型的RemoteViews

- Notification
- Toast
- Home Widget
- Launcher App Icon
- 应用间的RemoteViews (如何实现？)

android remote view
cross app, in 2 processes.

- Notification
- Widget
- cross app, plugin, etc

在一个应用中控制另外一个应用的界面

需要

- 初始化界面
- 数据转递， 双向， 单向？
- 状态变化的更新？
- 控制动作？

Intent/PendingIntent 在系统内是如何序列化跨进程传递和存储的？ 查看源代码，
Notification Manager 的机制， id - Notification
使用Notification.Builder.build() 出来的Notification 每次都是同一个对象吗？如果是不同的对象， OnlyAlertOnce 是如何控制的？

猜想
RemoteViews 应该是通过Binder 实现。 在一个进程中操作另外一个进程的界面。 从而需要提供一个统一的系统接口，sender 将界面打包成parcel， receiver 接收parcel后，使用parcel 中的数据render 成UI 展示出来。
在这个过程中

1. Sender 如何marshal UI to parcel
2. Receiver 如何unmarshal UI from parcel
3. 协议

一种方式是sender 将UI 完全渲染成bitmap，通过共享内存的方式将bitmap 地址发送给receiver， 并告知receiver 在屏幕的哪块区域显示(x,y,width, length, IBinder)
Receiver 接受到信息之后， 因为拿到的是bitmap，不需要渲染，直接在当前的屏幕上显示就可以了。

Receiver 可能会对bitmap 的规格有一些强制要求， 比如大小。 对于通知栏来说， length 和width 都是固定大小， x 永远为0， 有由通知栏的NotificationManagerService 来控制， 根据当前的通知条数来决定。
对于Home widget来说， Launcher 程序根据用户的选择决定x, y, width, length.

Toast 也是系统限制好大小位置。

像360 等经常在桌面上有悬浮框的做法是如何实现？

这样对开发者的API 封装可以为：
RemoteViews 封装x,y,width, length, bitmap
在sender 应用中: RemoteViews rv = new RemoteViews(View) View 通过inflate 出来， 在sender 应用中转成bitmap。
RemoteViews 调用系统Binder, 将这个bitmap 的内存设为共享内存。 通过Binder 机制传递给Receiver.

299 private static INotificationManager sService;
300
301 static private INotificationManager getService() {
302 if (sService != null) {
303 return sService;
304 }
305 sService = INotificationManager.Stub.asInterface(ServiceManager.getService("notification"));
306 return sService;
307 }

奇怪的是应用进程Toast.show 通过binder 传递给NotificationManager 的service 去展示(enqueToast)， 结果又通过binder 回调了TN 的show.
何苦呢？

阅读操作系统中的设备管理， 驱动程序， 进程模型， 进程管理，进程地址空间， IPC

Android Binder
Android Interprocess Communication
Thorsten Schreiber
First Advisor: Juraj Somorovsky
Second Advisor: Daniel Bumeyer
http://www.nds.rub.de/media/attachments/files/2012/03/binder.pdf

Linux Device Driver

Linux Device Drivers, Third Edition

http://lwn.net/Kernel/LDD3/
Chapter 1: An Introduction to Device DriversPDFChapter 2: Building and Running ModulesPDFChapter 3: Char DriversPDF

Programming in C
UNIX System Calls and Subroutines using C.
http://www.cs.cf.ac.uk/Dave/C/

- Interprocess Communication (IPC), Pipes
  - Piping in a C program: <stdio.h>
  - popen() -- Formatted Piping
  - pipe() -- Low level Piping
  - Exercises
- IPC:Interrupts and Signals: <signal.h>
  - Sending Signals -- kill(), raise()
  - Signal Handling -- signal()
  - sig_talk.c -- complete example program
  - Other signal functions
- IPC:Message Queues:<sys/msg.h>
  - Initialising the Message Queue
  - IPC Functions, Key Arguments, and Creation Flags: <sys/ipc.h>
  - Controlling message queues
  - Sending and Receiving Messages
  - POSIX Messages: <mqueue.h>
  - Example: Sending messages between two processes
    - message_send.c -- creating and sending to a simple message queue
    - message_rec.c -- receiving the above message
  - Some further example message queue programs
    - msgget.c: Simple Program to illustrate msget()
    - msgctl.cSample Program to Illustrate msgctl()
    - msgop.c: Sample Program to Illustrate msgsnd() and msgrcv()
  - Exercises
- IPC:Semaphores
  - Initializing a Semaphore Set
  - Controlling Semaphores
  - Semaphore Operations
  - POSIX Semaphores: <semaphore.h>
  - semaphore.c: Illustration of simple semaphore passing
  - Some further example semaphore programs
    - semget.c: Illustrate the semget() function
    - semctl.c: Illustrate the semctl() function
    - semop() Sample Program to Illustrate semop()
  - Exercises
- IPC:Shared Memory
  - Accessing a Shared Memory Segment
    - Controlling a Shared Memory Segment
  - Attaching and Detaching a Shared Memory Segment
  - Example two processes comunicating via shared memory: shm_server.c, shm_client.c
    - shm_server.c
    - shm_client.c
  - POSIX Shared Memory
  - Mapped memory
    - Address Spaces and Mapping
    - Coherence
    - Creating and Using Mappings
    - Other Memory Control Functions
  - Some further example shared memory programs
    - shmget.c:Sample Program to Illustrate shmget()
    - shmctl.c: Sample Program to Illustrate shmctl()
    - shmop.c: Sample Program to Illustrate shmat() and shmdt()
  - Exercises
- IPC:Sockets
  - Socket Creation and Naming
  - Connecting Stream Sockets
  - Stream Data Transfer and Closing
  - Datagram sockets
  - Socket Options
  - Example Socket Programs:socket_server.c,socket_client
    - socket_server.c
    - socket_client.c
  - Exercises
