---
layout: post
title: 'Flutter: The master of all'
date: 2018-03-09 00:11 +0530
categories: android
tags: flutter dart
keywords: android, flutter, apps, hybrid, google, dart
---
Today, I explored **Flutter**, a SDK by Google for cross-platform mobile app development(android and ios). 

## About Flutter

Flutter is an amazing product. Its like hybrid apps reborn!:thumbsup:
>the simplicity of Ionic, reactivity of React and performance of native, you can find all at one place. 

Flutter uses `dart` as its primary language which again is a great choice. I was able to get started with it in minutes. I found its syntax very similar to Typescript. It works with types only if you want to. Dart is much cooler than javascript but performs remarkably well.

The interesting thing about flutter is that is has created its own UI elements, but unlike `Ionic`, whose components are built on top of web technologies, flutter talks directly to the canvas.

>In Ionic => Components \| WebView \| Canvas

>In Flutter=> Components \| Canvas

Same thing makes is better from React Native, Flutter does not employ any middle man, all code written in dart is compiled to native code, no interpreter is used at runtime. 

Because widgets are packed *with* the app, your apps will look same **irrespective of android version**.
## A Look at the code
Dart supports async/await!:heart_eyes:

Sending HTTP requests:
```js
//Me: I don't want to use types.
//Dart: Here you go...

var client = new HttpClient();  
var req = await client.getUrl(Uri.parse(url));
var res = await req.close();
var body = await res.transform(UTF8.decoder).join();
//OR even easier with http library
var response = await http.get(url);
//Body: response.body, Statuscode: response.statusCode ...

//Promises are also supported
http.get(url).then((response){
    //response.body
})
//Parse JSON
var json_data = JSON.decode(body); 
```
Lets have a look at code for a screen with appbar
```java
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text("My App"),
      ),
      body: new Text("hello world"),
    );
  }
}
```
That's It!

Let's take a look at a Stateful Widget:
```java
class MyApp extends State<ChatScreen> {
  final List<Text> _messages = <Text>[];
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text("My App"),
        actions: <Widget>[
          new IconButton(
            icon: new Icon(Icons.add),
            onPressed: () {
              setState(() {
                _messages.add(new Text("Hello"));
              });
            },
          )
        ],
      ),
      body: new ListView.builder(
        itemBuilder: (_, i) => _messages[i],
        itemCount: _messages.length,
      ),
    );
  }
}
```
Quite Readable, isn't it? On clicking the add button in appbar, a new text,"Hello" will be added to list.

As you can see, the code pattern is very similar to React Native except the JSX part.
## Development Workflow
Developing my first little app with flutter went seamlessly. Flutter has great integration with my favourite code editor, [Visual Studio Code](https://code.visualstudio.com) using [Dart Code](https://marketplace.visualstudio.com/items?itemName=Dart-Code.dart-code). Completion and IntelliSense work great.

Flutter has great feature called "Hot reload":zap: which reloads code instantly in device/emulator.
