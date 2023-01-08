---
title: 'Flutter Counter App Using Provider Package'
date: 2023-01-06T21:40:00Z
draft: true
summary: 'A simple flutter app using provider package and stateless widgets'
cover:
  image: images/flutter-provider-cover.jpg
  alt: 'Post cover'
  caption: 'image source: https://unsplash.com/photos/Gll-v69L8iA'
tags: [flutter, dart]
categories: [programming]
---

First, we need to import the package in our Dart code:

```dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
```

Next, we need to create a data model class that will hold our app's state. We have a `CounterState` class that has a single `count` field and a `add()` method ti incremenet the count. The class should also extend `ChangeNotifier`, which is a class from Provider package that allows it to notify listeners when the data has changed.

```dart
class CounterState extends ChangeNotifier {
  int count = 0;

  void add() {
    count++;
    notifyListeners();
  }
}
```

In the `main()` function, we wrap our root `MaterialApp` widget with a `ChangeNotifierProvider` widget, which makes it so that all the children of the `MaterialApp` will have access to the `CounterState` data.

```dart
void main() {
  runApp(ChangeNotifierProvider(
    create: (context) => CounterState(),
    child: const CounterApp(),
  ));
}
```

To access the data in a widget, we can use the `context.watch<>()` method with a class that we want to watch.

```dart
class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    final count = context.watch<CounterState>();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Provider Demo'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              '${count.count}',
              style: const TextStyle(fontSize: 20),
            ),
            ElevatedButton(
              onPressed: () => count.add(),
              child: const Icon(Icons.add),
            )
          ],
        ),
      ),
    );
  }
}
```

Finally, we can use the `notifyListeners()` method of the `CounterState` class to trigger a rebuild of any widgets that depend on the `count` field. In this example, we call it in the `add()` method after incrementing the count.

```dart
void add() {
  count++;
  notifyListeners();
}
```

This was just a basic example of how to use a provider package. [GitHub Repo](https://github.com/Lisviks/flutter-provider-example). Check out [Provider](https://pub.dev/packages/provider) documentation for more.
