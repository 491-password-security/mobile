import 'package:flutter/material.dart';

//import 'package:firebase_auth/firebase_auth.dart';
//import 'package:firebase_core/firebase_core.dart';

import 'package:hive/hive.dart';
import 'package:hive_flutter/hive_flutter.dart';

import 'route.dart' as route;

void main() async {
  await Hive.initFlutter();
  //await Firebase.initializeApp();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  //final FirebaseAuth auth = FirebaseAuth.instance;
  MyApp({Key? key}) : super(key: key);

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
      initialRoute: "OTPpage",
    );
  }
}
