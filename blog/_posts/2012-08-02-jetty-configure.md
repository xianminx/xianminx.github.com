---
layout: post
title: "Jetty Configuration"
tags: [java, jetty]
---

## Jetty Configuration Files

There are a number of locations to configure settings for Jetty and web applciations running on it. 

A number of configuration files can be found at ${jetty.home}/start.ini. 

```
$java -jar start.jar --help

Available Configurations:
  By convention, configuration files are kept in $JETTY_HOME/etc.
  The known configuration files are:
  
    etc/jetty-ajp.xml
    etc/jetty-annotations.xml
    etc/jetty-bio-ssl.xml
    etc/jetty-bio.xml
    etc/jetty-contexts.xml
    etc/jetty-debug.xml
    etc/jetty-deploy.xml
    etc/jetty-fileserver.xml
    etc/jetty-ipaccess.xml
    etc/jetty-jmx.xml
    etc/jetty-logging.xml
    etc/jetty-monitor.xml
    etc/jetty-overlay.xml
    etc/jetty-plus.xml
    etc/jetty-policy.xml
    etc/jetty-proxy.xml
    etc/jetty-requestlog.xml
    etc/jetty-rewrite.xml
    etc/jetty-spdy-proxy.xml
    etc/jetty-spdy.xml
    etc/jetty-ssl.xml
    etc/jetty-stats.xml
    etc/jetty-testrealm.xml
    etc/jetty-webapps.xml
    etc/jetty-xinetd.xml
    etc/jetty.xml


Defaults:
  A start.ini file may be used to specify default arguments to start.jar,
  which are used if no command line arguments are provided and override 
  the defaults in the start.config file. If the directory jetty.home/start.d
  exists, then multiple *.ini files will be read from that directory in 
  alphabetical order. If --ini options are provided on  the command line,
  then start.ini and start.d will NOT be read. 
  
  The current start.ini arguments are:

    OPTIONS=Server,jsp,jmx,resources,websocket,ext,plus,annotations
    etc/jetty.xml
    etc/jetty-annotations.xml
    etc/jetty-deploy.xml
    etc/jetty-webapps.xml
    etc/jetty-contexts.xml
    etc/jetty-testrealm.xml

```


### Contexts
An important concept in Jetty is *Context*. A web application is a context. Thus each xml file configured under ./contexts directorty represents a web application. 


* ./contexts/test.xml 
    The applicaiton configure file, using format of jetty. Jetty uses its own IOC mechanism to read and inject components to the server. The root element of the file is *Server*, representing a server. 

* web.xml  
    `[webapp_name]/WEB-INF/web.xml`. This file is located under a web app WEB-INF directory. The directory name `WEB-INF` and file name `web.xml` is regulated by Serverlet web app standards. 

* jetty.xml

 








```
mac:jetty-distribution-8.1.5.v20120716 user1$ cat start.
cat: start.: No such file or directory
lucas-mac:jetty-distribution-8.1.5.v20120716 lucas$ cat start.ini 
#===========================================================
# Jetty start.jar arguments
# Each line of this file is prepended to the command line 
# arguments # of a call to:
#    java -jar start.jar [arg...]
#===========================================================



#===========================================================
# If the arguements in this file include JVM arguments 
# (eg -Xmx512m) or JVM System properties (eg com.sun.???),
# then these will not take affect unless the --exec 
# parameter is included or if the output from --dry-run
# is executed like:
#   eval $(java -jar start.jar --dry-run)
#
# Below are some recommended options for Sun's JRE
#-----------------------------------------------------------
# --exec
# -Dorg.apache.jasper.compiler.disablejsr199=true
# -Dcom.sun.management.jmxremote
# -Dorg.eclipse.jetty.util.log.IGNORED=true
# -Dorg.eclipse.jetty.LEVEL=DEBUG
# -Dorg.eclipse.jetty.util.log.stderr.SOURCE=true
# -Xmx2000m
# -Xmn512m
# -verbose:gc
# -XX:+PrintGCDateStamps
# -XX:+PrintGCTimeStamps
# -XX:+PrintGCDetails
# -XX:+PrintTenuringDistribution
# -XX:+PrintCommandLineFlags
# -XX:+DisableExplicitGC
# -XX:+UseConcMarkSweepGC
# -XX:ParallelCMSThreads=2
# -XX:+CMSClassUnloadingEnabled  
# -XX:+UseCMSCompactAtFullCollection
# -XX:CMSInitiatingOccupancyFraction=80
#-----------------------------------------------------------


#===========================================================
# Start classpath OPTIONS.
# These control what classes are on the classpath
# for a full listing do
#   java -jar start.jar --list-options
#-----------------------------------------------------------
OPTIONS=Server,jsp,jmx,resources,websocket,ext,plus,annotations
#-----------------------------------------------------------


#===========================================================
# Configuration files.
# For a full list of available configuration files do
#   java -jar start.jar --help
#-----------------------------------------------------------
#etc/jetty-jmx.xml
etc/jetty.xml
etc/jetty-annotations.xml
# etc/jetty-ssl.xml
# etc/jetty-requestlog.xml
etc/jetty-deploy.xml
#etc/jetty-overlay.xml
etc/jetty-webapps.xml
etc/jetty-contexts.xml
etc/jetty-testrealm.xml
#===========================================================
``` 


