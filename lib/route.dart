import 'package:flutter/material.dart';

import 'screens/initialscreen/InitialPage.dart';
import 'screens/initialscreen/Entry.dart';
import 'screens/initialscreen/PopUpDesign.dart';
import 'screens/initialscreen/SimpleDesign.dart';
import 'screens/initialscreen/OTPpage.dart';
import 'screens/initialscreen/PasswordPage.dart';
import 'screens/HomeScreen/HomePage.dart';

class DefaultPage extends StatefulWidget {
  @override
  State<DefaultPage> createState() => defaultPageState();
}

class defaultPageState extends State<DefaultPage> {
  @override
  Widget build(BuildContext context) {
    return const Text("Error: Empty Page!");
  }
}

var routes = {
  'OTPpage': () => OTPpage(),
  'HomePage': () => HomePage(),
  'PasswordPage': () => PasswordPage(),
};

Route<dynamic> controller(RouteSettings settings) {
  var page = routes[settings.name] ?? () => DefaultPage();
  var rv = MaterialPageRoute(builder: (context) => page());
  return rv;
}
