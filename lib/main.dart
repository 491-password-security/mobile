import 'package:flutter/material.dart';


import 'package:hive/hive.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:mobile/theme.dart';
import 'package:provider/provider.dart';

import 'route.dart' as route;
import 'globals.dart' as globals;

void main() async {
  await Hive.initFlutter();
  globals.tokenStore = await Hive.openBox('data');
  globals.preferencesStore = await Hive.openBox('preferences');
  //globals.preferencesStore.clear();
  //var aa = await Hive.openBox('data');
  
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider<ThemeChanger>( 
      create: (_)=> ThemeChanger(loadTheme(context)),
      child: new MaterialAppWithTheme(),
    );
  }
}



class MaterialAppWithTheme extends StatelessWidget{
  @override
  Widget build(BuildContext context){
    final theme = Provider.of<ThemeChanger>(context);
    return MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Password Security',
        theme: theme.getTheme(),
        onGenerateRoute: route.controller,
        initialRoute: "OTPpage",
      );
  }
}
