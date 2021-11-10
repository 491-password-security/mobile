import 'package:flutter/material.dart';
import 'route.dart' as route;

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Password Security',
      theme: ThemeData(
        primaryColor: Colors.white,
      ),
      onGenerateRoute: route.controller,
      initialRoute: "InitialPage",
    );
  }
}
