import 'package:flutter/material.dart';

import 'screens/initialscreen/InitialPage.dart';
import 'screens/initialscreen/Entry.dart';
import 'screens/initialscreen/PopUpDesign.dart';
import 'screens/initialscreen/SimpleDesign.dart';
import 'screens/initialscreen/OTPpage.dart';
import 'screens/initialscreen/PasswordPage.dart';
import 'screens/HomeScreen/home.dart';
import 'screens/Settings/settings.dart';
import 'screens/HomeScreen/home.dart';

import 'package:hive/hive.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'dart:io';

import 'globals.dart' as globals;

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
  'SettingsPage': () => SettingsPage(),
  'OTPpage': () => OTPpage(),
  'HomePage': () => HomePage(),
  'PasswordPage': () => PasswordPage(),
};


Route<dynamic> controller(RouteSettings settings) {
  var page;
  bool value = globals.tokenStore.containsKey('access_token');
  if(!value){
    page = routes['OTPpage'];
  }else if(value && settings.name == 'OTPpage'){
    page = routes['PasswordPage'];
  }else{
    page = routes[settings.name] ?? () => DefaultPage();
  }
  
  var rv = MaterialPageRoute(builder: (context) => page());
  return rv;
}
