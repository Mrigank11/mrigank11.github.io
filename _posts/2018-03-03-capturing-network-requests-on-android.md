---
layout: post
title: Capturing network requests on Android
date: 2018-03-03 13:47 +0530
categories: networking
tags: android hacking
keywords: android, hacking, proxy, certificate, authority, ca, nougat, apk, burp, mitmproxy
comments: true
---
In this post, I will **explore** different ways to capture network requests from android device. I will go from "using simple proxy" to patching APK file.

Here is map of this post:
- [Using Proxy](#using-proxy): Obvious way, works most of the time(HTTP only)
- [Patch APK to use HTTP](#patch-apk-to-use-http)
- [Adding custom CA](#adding-custom-ca): capture HTTPS requests(Requires root).
- [Patch APK to disable certificate Pinning](#patch-apk-to-disable-certificate-pinning)

## Using proxy
The first and most obvious method is to use proxy to redirect all requests to a proxy server.
Following are some tools to do the same:
- #### [Burp Suite - Community Edition](https://portswigger.net/burp)
It is a tool written in java developed by PortSwigger especially for network penetration testing. You should use it to do simple and quick capturing as it provides a gui. Its a great tool for beginners.
- #### [MitmProxy](https://mitmproxy.org/)
This is an opensource command line utility for pentesting. It is more powerful than BurpSuite. It provides a python module for more conrol over proxy. Once you learn it, workflow will be much faster as compared to BurpSuite.

At this point you should be able to intercept HTTP request successfully, but for capturing HTTPs requests you must add your custom CA to device(I'll add a post about HTTPs soon).
 
But lets first consider the case when the target server does not automatically redirect to
HTTP.

## Patch APK to use HTTP
First decompile the apk using APKTool.

In most cases, `grep` will give you location of file containing site host in decompiled APK. It could be in `strings.xml` or in some `.smali` files.

Once the file is found, simply replace https with http. Then you can easily use burpsuite or mitmproxy to intercept requests.

**Note**: Even if website redirects to https automatically, you can create a simple http server to server as a proxy between your device and host.

## Adding custom CA
If you **must** capture HTTPs requests, then you must add your custom CA cert. to device's trusted store.

If if your android version is below `Nougat`, you can simply download cert to device and install it as you install an app.

But if that's not the case, you'll need to go through a long process to add custom CA which involves **rooting** you device. If you're ok with it go ahead and visit [this blog.](https://blog.jeroenhd.nl/article/android-7-nougat-and-certificate-authorities)

Even after adding custom CA, you might not be able to intercept network requests. If that's the case then there is a high probability than the target app is using [certificate pinning](https://security.stackexchange.com/questions/29988/what-is-certificate-pinning).

## Patch APK to disable certificate pinning
In most of the cases apps use `okhttp` library to make http requests.

Try to search for this in decompiled app source(`grep -r okhttp .`). 
If found remove search for calls to `setCertificatePinner` method in decompiled smali(s) and remove that line.

Even if its not `okhttp` you can search out the method for library the app is using and remove relevant function call.
