import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart' as fa;

import 'package:mobile/globals.dart' as globals;
import 'package:mobile/theme.dart';
import 'package:provider/provider.dart';

class SettingsPage extends StatefulWidget {
  const SettingsPage({Key? key}) : super(key: key);

  @override
  State<SettingsPage> createState() => SettingsPageState();
}

class SettingsPageState extends State<SettingsPage> {

  

  @override
  Widget build(BuildContext context) {
    ThemeChanger _themeChanger = Provider.of<ThemeChanger>(context);
    Widget page = Scaffold(
      appBar: AppBar(
        toolbarHeight: 40,
        title: const Text("Settings"),
      ),
      body: Column(
        children: <Widget>[
          Container(
            margin: EdgeInsets.only(top: 4),
            padding: const EdgeInsets.only(left: 8, right: 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget>[
                Text('Theme'),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: <Widget>[
                    Container(
                      margin: EdgeInsets.only(right: 5),
                      child:ElevatedButton(
                        onPressed: (){
                          globals.preferencesStore.put('theme', 'System');
                          setSystemTheme(context, _themeChanger);
                        }, 
                        child: Text('System'),
                      )
                    ),
                    Container(
                      margin: EdgeInsets.only(right: 5),
                      child:ElevatedButton(
                        onPressed: (){
                          globals.preferencesStore.put('theme', 'Light');
                          _themeChanger.setTheme(lightTheme);
                        }, 
                        child: Text('Light'),
                      )
                    ),
                    ElevatedButton(
                      onPressed: (){
                        globals.preferencesStore.put('theme', 'Dark');
                        _themeChanger.setTheme(darkTheme);
                      },
                      child: Text('Dark'),
                    ),
                  ]
                ),
              ],
            )
            //globals.preferencesStore.put('theme', _light);
          ),
          Container(
            child: ElevatedButton(
              child: Text('Logout'),
              onPressed: (){
                globals.tokenStore.clear().then((value) => Navigator.pushNamed(context, "OTPpage"));
              },
            ),
          ),
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
              icon: fa.FaIcon(fa.FontAwesomeIcons.userSecret), label: "Vault"),
          BottomNavigationBarItem(
              icon: Icon(Icons.settings), label: "Settings"),
        ],
        currentIndex: 1,
        onTap: (index) => {
          if (index == 0) Navigator.pushReplacementNamed(context, "HomePage")
        },
      ),
    );
    return page;
  }

  Widget getItemBox(){
    return Container(

    );
  }
}
