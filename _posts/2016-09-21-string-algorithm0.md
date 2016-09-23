---
layout: post
title: "SIP System Integration Protection"
published: true
tags: [string, trie, pattern matching]
---



```bash
sudo gem install bundler
/System/Library/Frameworks/Ruby.framework/Versions/2.0/usr/lib/ruby/2.0.0/universal-darwin15/rbconfig.rb:213: warning: Insecure world writable dir /Users/lucas/dev/android/dex2jar/dex2jar-0.0.9.15 in PATH, mode 040777
Fetching: bundler-1.13.1.gem (100%)
ERROR:  While executing gem ... (Errno::EPERM)
   Operation not permitted - /usr/bin/bundle
```


Google it find https://github.com/bundler/bundler/issues/4065


After adding option `-n /usr/local/bin`, it works.

```bash
sudo gem install bundler -n /usr/local/bin
Successfully installed bundler-1.13.1
Parsing documentation for bundler-1.13.1
Installing ri documentation for bundler-1.13.1
1 gem installed
```

http://apple.stackexchange.com/questions/193368/what-is-the-rootless-feature-in-el-capitan-really

* You can't modify anything in /System, /bin, /sbin, or /usr (except /usr/local); or any of the built-in apps and utilities. Only Installer and software update can modify these areas, and even they only do it when installing Apple-signed packages. But since normal OS X-style customizations go in /Library (or ~/Library, or /Applications), and unix-style customizations (e.g. Homebrew) go in /usr/local (or sometimes /etc or /opt), this shouldn't be a big deal. It also prevents block-level writes to the startup disk, so you can't bypass it that way.

The full list of restricted directories (and exceptions like /usr/local and a few others) is in /System/Library/Sandbox/rootless.conf. Of course, this file is itself in a restricted area.

When you upgrade to El Capitan, it moves any "unauthorized" files from restricted areas to /Library/SystemMigration/History/Migration-(some UUID)/QuarantineRoot/.

* You can't attach to system processes (e.g. those running from those system locations) for things like debugging (or changing what dynamic libraries they load, or some other things). Again, not too much of a big deal; developers can still debug their own programs.

This does block some significant things like injecting code into the built-in Apple apps (notably the Finder). It also means that dtrace-based tools for system monitoring (e.g. opensnoop) will not be able to monitor & report on many system processes.

* You can't load kernel extensions (kexts) unless they're properly signed (i.e. by Apple or an Apple-approved developer). Note that this replaces the old system for enforcing kext signing (and the old ways of bypassing it). But since v10.10.4 Apple has had a way to enable trim support for third-party SSDs, the #1 reason to use unsigned kexts has gone away.
